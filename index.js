var canvas = document.createElement("canvas"),
    ctx = canvas.getContext("2d"),
    m = {
        frame: { verts: [], sm: 0.1, scale: 2, rot: { x: 0, y: 0, z: 0 } },
        origin: { x:( window.innerWidth / 2 ) - 50, y: ( window.innerHeight / 2 ) + 150, z: 0 },
        verts: [],
        lines: []
   };

window.setTimeout( function() { 
    //m.t = window.setInterval( function() { doDraw(); }, 1000 );

    addVert(m.verts, -100, -100,  100 ); // 0
    addVert(m.verts, -100,  100,  100 ); // 1       
    addVert(m.verts, 0, 175,  100 ); //     1
    addVert(m.verts,  100,  100, -100 ); // 2
    addVert(m.verts,  100, -100, -100 ); // 3

    addLine(m.lines, 0, 1);
    addLine(m.lines, 1, 2);
    addLine(m.lines, 2, 3);
    addLine(m.lines, 3, 4);
    addLine(m.lines, 4, 0);

    canvas.setAttribute("width", window.innerWidth - 100);
    canvas.setAttribute("height", window.innerHeight - 100);
    canvas.setAttribute("style", "position: absolute; x:0; y:0;");
    document.body.appendChild(canvas);

    //m.timer = window.setInterval(  doDraw , 1 );
    window.requestAnimationFrame( doDraw );
    
    
}, 1000);


function addVert(verts, x, y, z) {
    verts.push( { x: x, y: y, z: z } );
}


function addLine(lines, v1, v2 ) {
    lines.push( { v1: v1, v2: v2 } )
}


function doDraw() {
    
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.font="20px Georgia";

    m.frame.verts = [];
    animRound( animRotate( animTranslate( animScale( m ) ) ) );
   
    ctx.clearRect ( 0 , 0 , canvas.width, canvas.height );
    m.lines.forEach(function( o, i ) {

        ctx.moveTo( m.frame.verts[o.v1].x, m.frame.verts[o.v1].y );
        ctx.lineTo( m.frame.verts[o.v2].x, m.frame.verts[o.v2].y );
        ctx.fillText( '(' + m.frame.verts[o.v1].x + ', ' + m.frame.verts[o.v1].y + ')', m.frame.verts[o.v1].x - 50, m.frame.verts[o.v1].y -25 );
        
        ctx.stroke();

    });
    window.requestAnimationFrame( doDraw );
}


function animScale(m) {
    if ( m.frame.scale <= 1 || m.frame.scale >= 3 ) { m.frame.sm = -m.frame.sm; }
    m.frame.scale += m.frame.sm;

    m.verts.forEach( function( o,i ) {
        m.frame.verts.push( {
            x: o.x * m.frame.scale ,
            y: o.y * -m.frame.scale ,
            z: o.z * m.frame.scale
        } );
    });

    return m;
}


function animTranslate(m) {
    m.frame.verts.forEach( function( o,i ) {
        o.x = o.x + m.origin.x;
        o.y = o.y + m.origin.y;
        o.z = o.z + m.origin.z;
    });

    return m;
}


function animRotate(m) {
    m.frame.verts.forEach( function( o,i ) {

    });
    return m;
}


function animRound(m) {
    m.frame.verts.forEach( function ( o,i ) {
        o.x = Math.round(o.x * 10) / 10;
        o.y = Math.round(o.y * 10) /10;
        o.z = Math.round(o.z * 10) / 10;
    });
    return m;
}
