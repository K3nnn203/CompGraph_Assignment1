const button1 = document.getElementById("1");
const button2 = document.getElementById("2");
const button3 = document.getElementById("3");
const button4 = document.getElementById("4");

// Wait for the page to load
window.onload = function() {
    // Get the canvas element
    const canvas = document.getElementById('glCanvas');
    // Initialize the GL context
    const gl = canvas.getContext('webgl');

    // Only continue if WebGL is available and working
    if (!gl) {
        alert('Unable to initialize WebGL. Your browser may not support it.');
        return;
    }

    // Set clear color to black, fully opaque
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Vertex shader program
    const vsSource = `
        attribute vec4 aVertexPosition;
        void main() {
            gl_Position = aVertexPosition;
        }
    `;

    // Fragment shader program
    let fsSource = `
        void main() {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }   
    `;

    // Initialize a shader program
    let shaderProgram = initShaderProgram(gl, vsSource, fsSource);

    const positionBuffer = gl.createBuffer();
    const positions = [
        -0.7,  0.5,
         0.7,  0.5,
        -0.7, -0.5,
         0.7, -0.5,
    ];
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    drawScene(gl, shaderProgram, positionBuffer);

    button1.addEventListener('click', function(){
        fsSource = `
            void main() {
                gl_FragColor = vec4(0.0, 1.0, 1.0, 1.0);
            }   
        `;
        shaderProgram = initShaderProgram(gl, vsSource, fsSource);
        drawScene(gl, shaderProgram, positionBuffer);
    })
    
    button2.addEventListener('click', function(){
        fsSource = `
            void main() {
                gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
            }   
        `;
        shaderProgram = initShaderProgram(gl, vsSource, fsSource);
        drawScene(gl, shaderProgram, positionBuffer);
    })
    
    button3.addEventListener('click', function(){
        fsSource = `
            void main() {
                gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
            }   
        `;
        shaderProgram = initShaderProgram(gl, vsSource, fsSource);
        drawScene(gl, shaderProgram, positionBuffer);
    })
    
    button4.addEventListener('click', function(){
        fsSource = `
            void main() {
                gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
            }   
        `;
        shaderProgram = initShaderProgram(gl, vsSource, fsSource);
        drawScene(gl, shaderProgram, positionBuffer);
    })
    
    
    
    

   



// Initialize a shader program, so WebGL knows how to draw our data
function initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    // Create the shader program
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // If creating the shader program failed, alert
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
        return null;
    }

    return shaderProgram;
}

// Creates a shader of the given type, uploads the source and compiles it.
function loadShader(gl, type, source) {
    const shader = gl.createShader(type);

    // Send the source to the shader object
    gl.shaderSource(shader, source);

    // Compile the shader program
    gl.compileShader(shader);

    // See if it compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

function drawScene(gl, shaderProgram, positionBuffer){
     // Get the attribute 
     
     gl.clear(gl.COLOR_BUFFER_BIT);
     const vertexPosition = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
 
     // Select the positionBuffer as the one to apply buffer operations to from here out
     gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
 
 
     // Tell WebGL how to pull out the positions from the position buffer into the vertexPosition attribute
     gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 0, 0);
     gl.enableVertexAttribArray(vertexPosition);
 
     // Use our shader program
     gl.useProgram(shaderProgram);
 
     // Draw the rectangle
     gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
 }
}

