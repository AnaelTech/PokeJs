// AI - 
// La scène de la carte sait lire le JSON de Tiled et fabriquer des "boîtes" de collision.
// Dis toi que c'est comme poser des briques invisibles là où il ne faut pas passer 🙂
export class MapScene {
    constructor(src, ctx) {
        this.src = src;      // chemin du fichier JSON exporté depuis Tiled
        this.ctx = ctx;      // contexte 2D du canvas (utile pour debug)
        this.MapSceneStatus = "map";
    // Colliders peut contenir des rectangles et des polygones selon Tiled
    // - Rect: { type: 'rect', x, y, width, height }
    // - Poly: { type: 'poly', points: [{x,y}...], aabb: {x,y,width,height} }
    this.colliders = [];
        this.ready = false;  // true quand le JSON est chargé
        this.showDebug = false; // passe à true pour voir les collisions en rouge

        // On lance le chargement du JSON tout de suite
        this.loadMap(src);
    }

    // Retourne la liste des boîtes de collision (si tu veux l'inspecter)
    collisions() {
        return this.colliders;
    }

    // Dessine un polygone (uniquement pour debug visuel si besoin)
    polygon(x, y, polygon) {
        if (!this.ctx || !polygon || polygon.length === 0) return;
        this.ctx.beginPath();
        // Les points du polygone sont relatifs à (x,y)
        this.ctx.moveTo(x + polygon[0].x, y + polygon[0].y);
        for (let i = 1; i < polygon.length; i++) {
            this.ctx.lineTo(x + polygon[i].x, y + polygon[i].y);
        }
        this.ctx.closePath();
        this.ctx.fill();
    }

    // Dessine un rectangle plein (debug)
    rectangle(x, y, w, h) {
        if (!this.ctx) return;
        this.ctx.fillRect(x, y, w, h);
    }

    // Petit utilitaire: test d'intersection entre 2 rectangles (AABB)
    // Chaque rect a: { x, y, width, height }
    static rectsIntersect(a, b) {
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        );
    }

    // Un point est-il dans un rectangle ?
    static rectContainsPoint(rect, p) {
        return (
            p.x >= rect.x && p.x <= rect.x + rect.width &&
            p.y >= rect.y && p.y <= rect.y + rect.height
        );
    }

    // Rectangle -> 4 coins en ordre
    static rectCorners(r) {
        return [
            { x: r.x, y: r.y },
            { x: r.x + r.width, y: r.y },
            { x: r.x + r.width, y: r.y + r.height },
            { x: r.x, y: r.y + r.height },
        ];
    }

    // Boîte englobante d'un polygone (pour rejet rapide)
    static polygonAABB(points) {
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        for (const p of points) {
            if (p.x < minX) minX = p.x;
            if (p.y < minY) minY = p.y;
            if (p.x > maxX) maxX = p.x;
            if (p.y > maxY) maxY = p.y;
        }
        return { x: minX, y: minY, width: Math.max(0, maxX - minX), height: Math.max(0, maxY - minY) };
    }

    // Test point dans polygone (algo du rayon)
    static pointInPolygon(pt, points) {
        let inside = false;
        for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
            const xi = points[i].x, yi = points[i].y;
            const xj = points[j].x, yj = points[j].y;
            const intersect = ((yi > pt.y) !== (yj > pt.y)) &&
                (pt.x < ((xj - xi) * (pt.y - yi)) / ((yj - yi) || 1e-12) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
    }

    // Outils d'intersection de segments
    static _orientation(a, b, c) {
        const val = (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y);
        if (Math.abs(val) < 1e-12) return 0; // colinéaire
        return val > 0 ? 1 : 2; // 1=horaire, 2=anti-horaire
    }
    static _onSegment(a, b, c) {
        return (
            Math.min(a.x, c.x) <= b.x && b.x <= Math.max(a.x, c.x) &&
            Math.min(a.y, c.y) <= b.y && b.y <= Math.max(a.y, c.y)
        );
    }
    static segmentsIntersect(p1, q1, p2, q2) {
        const o1 = MapScene._orientation(p1, q1, p2);
        const o2 = MapScene._orientation(p1, q1, q2);
        const o3 = MapScene._orientation(p2, q2, p1);
        const o4 = MapScene._orientation(p2, q2, q1);

        if (o1 !== o2 && o3 !== o4) return true;
        if (o1 === 0 && MapScene._onSegment(p1, p2, q1)) return true;
        if (o2 === 0 && MapScene._onSegment(p1, q2, q1)) return true;
        if (o3 === 0 && MapScene._onSegment(p2, p1, q2)) return true;
        if (o4 === 0 && MapScene._onSegment(p2, q1, q2)) return true;
        return false;
    }

    // Intersections polygon (potentiellement concave) <-> rectangle
    static polygonIntersectsRect(points, rect, preAABB) {
        // 1) Rejet rapide par AABB
        const aabb = preAABB || MapScene.polygonAABB(points);
        if (!MapScene.rectsIntersect(aabb, rect)) return false;

        // 2) Si un coin du rect est dedans le polygone -> collision
        const rc = MapScene.rectCorners(rect);
        for (const c of rc) {
            if (MapScene.pointInPolygon(c, points)) return true;
        }

        // 3) Si un sommet du polygone est dans le rect -> collision
        for (const p of points) {
            if (MapScene.rectContainsPoint(rect, p)) return true;
        }

        // 4) Si un segment du polygone coupe un bord du rect -> collision
        const rectEdges = [
            [rc[0], rc[1]],
            [rc[1], rc[2]],
            [rc[2], rc[3]],
            [rc[3], rc[0]],
        ];
        for (let i = 0; i < points.length; i++) {
            const a = points[i];
            const b = points[(i + 1) % points.length];
            for (const [r1, r2] of rectEdges) {
                if (MapScene.segmentsIntersect(a, b, r1, r2)) return true;
            }
        }

        return false;
    }

    // Dis: "ai-je tapé une brique si je vais ici?"
    // nextRect est la future boîte du joueur: { x, y, width, height }
    isColliding(nextRect) {
        if (!this.ready) return false; // si pas chargé, on laisse passer
        for (const c of this.colliders) {
            if (c.type === 'rect') {
                if (MapScene.rectsIntersect(nextRect, c)) return true;
            } else if (c.type === 'poly') {
                if (MapScene.polygonIntersectsRect(c.points, nextRect, c.aabb)) return true;
            }
        }
        return false;
    }

    // Affiche les colliders en rouge transparent (pour t'aider à voir)
    drawDebug(ctx) {
        if (!this.showDebug || !this.ready) return;
        ctx.save();
        ctx.fillStyle = "rgba(255,0,0,0.25)";
        ctx.strokeStyle = "rgba(255,0,0,0.8)";
        for (const c of this.colliders) {
            if (c.type === 'rect') {
                ctx.fillRect(c.x, c.y, c.width, c.height);
            } else if (c.type === 'poly') {
                if (c.points.length) {
                    ctx.beginPath();
                    ctx.moveTo(c.points[0].x, c.points[0].y);
                    for (let i = 1; i < c.points.length; i++) {
                        ctx.lineTo(c.points[i].x, c.points[i].y);
                    }
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                }
            }
        }
        ctx.restore();
    }

    // Charge le fichier JSON de Tiled et convertit l'object layer "Collisions"
    // en une liste de rectangles simples (on simplifie les polygones en boîtes englobantes).
    async loadMap(file) {
        try {
            const res = await fetch(file);
            const data = await res.json();

            // On cherche le calque d'objets nommé "Collisions"
            const collisionsLayer = (data.layers || []).find(
                (l) => l.type === "objectgroup" && l.name === "Collisions"
            );
            if (!collisionsLayer) {
                console.warn("Aucun calque d'objets 'Collisions' trouvé dans le JSON.");
                this.ready = true;
                return;
            }

            // On parcourt chaque objet du calque
            for (const obj of collisionsLayer.objects || []) {
                // Respecte la propriété Tiled "collidable: false" si elle existe
                const hasProps = Array.isArray(obj.properties);
                if (hasProps) {
                    const prop = obj.properties.find(p => p.name === "collidable");
                    if (prop && prop.type === "bool" && prop.value === false) {
                        continue; // on ignore cet objet, non bloquant
                    }
                }
                // Cas 1: rectangles (width/height > 0)
                if ((obj.width || 0) > 0 && (obj.height || 0) > 0) {
                    // Dans Tiled, x,y sont le coin haut-gauche pour les rectangles => parfait pour nous
                    this.colliders.push({ type: 'rect', x: obj.x, y: obj.y, width: obj.width, height: obj.height });
                    continue;
                }

                // Cas 2: polygones => on garde la forme exacte (points monde)
                if (obj.polygon && Array.isArray(obj.polygon) && obj.polygon.length) {
                    const worldPts = obj.polygon.map(p => ({ x: obj.x + p.x, y: obj.y + p.y }));
                    const aabb = MapScene.polygonAABB(worldPts);
                    this.colliders.push({ type: 'poly', points: worldPts, aabb });
                }
            }

            this.ready = true;
        } catch (e) {
            console.error("Erreur de chargement de la map:", e);
            this.ready = true; // on évite de bloquer
        }
    }
}
