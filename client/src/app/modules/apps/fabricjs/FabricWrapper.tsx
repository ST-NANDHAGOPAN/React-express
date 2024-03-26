import { useState, useEffect, useCallback } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { FaMinus, FaUndo, FaRedo, FaTrashAlt, FaCrop, FaPalette, FaPencilAlt, FaTrash, FaTextWidth, FaCircle, FaSquare, FaDrawPolygon, FaSave, FaCopy, FaBan, FaCheckCircle, FaVectorSquare, FaMobile } from 'react-icons/fa';
import "./fabric.css";
import { BiStopCircle } from 'react-icons/bi';

const Polygonpoints = [
  { "x": 60, "y": 20 },
  { "x": 100, "y": 40 },
  { "x": 100, "y": 80 },
  { "x": 60, "y": 100 },
  { "x": 20, "y": 80 },
  { "x": 20, "y": 40 }
];

const squarePoints = [
  { "x": 40, "y": 40 },
  { "x": 60, "y": 40 },
  { "x": 60, "y": 80 },
  { "x": 40, "y": 80 },
  { "x": 20, "y": 80 },
  { "x": 20, "y": 40 }
];

const rectanglePoints = [
  { "x": 60, "y": 40 },
  { "x": 100, "y": 40 },
  { "x": 100, "y": 80 },
  { "x": 60, "y": 80 },
  { "x": 20, "y": 80 },
  { "x": 20, "y": 40 }
];



function FabricWrapper() {
  const { editor, onReady } = useFabricJSEditor();
  const [canvas, setCanvas] = useState(null);
  const [color, setColor] = useState("#35363a");
  const [cropImage, setCropImage] = useState(true);
  const [addCircleMode, setAddCircleMode] = useState(false);
  const [objectsMovable, setObjectsMovable] = useState(true); // State for enabling/disabling object movement
  const history = [];
  const [showPolygonOptions, setShowPolygonOptions] = useState(false);


  const actionHandler = useCallback((eventData, transform, x, y) => {
    const polygon = transform.target;
    const currentControl = polygon.controls[polygon.__corner];
    const mouseLocalPosition = polygon.toLocalPoint(new fabric.Point(x, y), 'center', 'center');
    const polygonBaseSize = getObjectSizeWithStroke(polygon);
    const size = polygon._getTransformedDimensions(0, 0);
    const finalPointPosition = {
      x: (mouseLocalPosition.x * polygonBaseSize.x) / size.x + polygon.pathOffset.x,
      y: (mouseLocalPosition.y * polygonBaseSize.y) / size.y + polygon.pathOffset.y,
    };
    polygon.points[currentControl.pointIndex] = finalPointPosition;
    return true;
  }, [])

  const anchorWrapper = useCallback((anchorIndex, fn) => {
    return function (eventData, transform, x, y) {
      const fabricObject = transform.target;
      const absolutePoint = fabric.util.transformPoint(
        {
          x: fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x,
          y: fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y,
        },
        fabricObject.calcTransformMatrix()
      );
      const actionPerformed = fn(eventData, transform, x, y);
      fabricObject._setPositionDimensions({});
      const polygonBaseSize = getObjectSizeWithStroke(fabricObject);
      const newX = (fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x) / polygonBaseSize.x;
      const newY = (fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y) / polygonBaseSize.y;
      fabricObject.setPositionByOrigin(absolutePoint, newX + 0.5, newY + 0.5);
      return actionPerformed;
    };
  }, [])

  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }
    if (editor.canvas.isDrawingMode) {
      editor.canvas.freeDrawingBrush.color = color;
    }
    const savedCanvasState = localStorage.getItem("canvasState");
    if (savedCanvasState && editor) {
      editor.canvas.loadFromJSON(savedCanvasState, () => {
        const viewportTransformString = localStorage.getItem("viewportTransform");
        if (viewportTransformString) {
          const viewportTransform = JSON.parse(viewportTransformString);
          editor.canvas.setViewportTransform(viewportTransform);
        }
        editor.canvas.forEachObject(obj => {
          if (obj.type === 'polygon') { // Assuming 'polygon' is the type of your polygon objects
            updatePolygonPropertiesAndControls(obj, polygonPositionHandler, anchorWrapper, actionHandler);
          }
        });
        editor.canvas.renderAll();
      });
    }

    if (cropImage) {
      editor.canvas.__eventListeners = {};
      editor.canvas.setHeight(500);
      editor.canvas.renderAll();
    }
    else {
      if (!editor.canvas.__eventListeners["mouse:wheel"]) {
        editor.canvas.on("mouse:wheel", function (opt) {
          var delta = opt.e.deltaY;
          var zoom = editor.canvas.getZoom();
          zoom *= 0.999 ** delta;
          if (zoom > 20) zoom = 20;
          if (zoom < 0.01) zoom = 0.01;
          editor.canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
          opt.e.preventDefault();
          opt.e.stopPropagation();
        });
      }

      if (!editor.canvas.__eventListeners["mouse:down"]) {
        editor.canvas.on("mouse:down", (opt) => {
          var evt = opt.e;
          if (evt.ctrlKey === true) {
            editor.canvas.isDragging = true;
            editor.canvas.selection = false;
            editor.canvas.lastPosX = evt.clientX;
            editor.canvas.lastPosY = evt.clientY;
          }
        });
      }

      if (!editor.canvas.__eventListeners["mouse:move"]) {
        editor.canvas.on("mouse:move", (opt) => {
          if (editor.canvas.isDragging) {
            var e = opt.e;
            var vpt = editor.canvas.viewportTransform;
            vpt[4] += e.clientX - editor.canvas.lastPosX;
            vpt[5] += e.clientY - editor.canvas.lastPosY;
            editor.canvas.requestRenderAll();
            editor.canvas.lastPosX = e.clientX;
            editor.canvas.lastPosY = e.clientY;
          }
        });
      }

      if (!editor.canvas.__eventListeners["mouse:up"]) {
        editor.canvas.on("mouse:up", (opt) => {
          // on mouse up we want to recalculate new interaction
          // for all objects, so we call setViewportTransform
          editor.canvas.setViewportTransform(editor.canvas.viewportTransform);
          editor.canvas.isDragging = false;
          editor.canvas.selection = true;
          editor.canvas.requestRenderAll();

        });
      }

    }
    if (addCircleMode) {
      editor.canvas.forEachObject((obj) => {
        obj.set({
          selectable: false,
          evented: true,
          hasControls: false,
          hasBorders: false,
          lockMovementX: false,
          lockMovementY: false,
        });
      });
    }
    if (!editor.canvas.__eventListeners["mouse:down"]) {
      editor.canvas.on("mouse:down", (opt) => {
        if (addCircleMode) {
          const pointer = editor.canvas.getPointer(opt.e);
          const initialX = pointer.x;
          const initialY = pointer.y;
          let isDragging = false;
          let clicked = false;
          let newLineCircles: fabric.Circle[] = []; // Array to hold the newly created circles
    
          const createLineOfCircles = (startX, startY, endX, endY) => {
            newLineCircles.forEach(circle => {
              editor.canvas.remove(circle); // Remove previously created circles
            });
            newLineCircles = []; // Clear the array
    
            const dx = endX - startX;
            const dy = endY - startY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const interval = 20;
            let currentDistance = 0;
    
            while (currentDistance < distance) {
              const ratio = currentDistance / distance;
              const x = startX + dx * ratio;
              const y = startY + dy * ratio;
              const circle = createCircle(x, y);
              newLineCircles.push(circle); // Add the circle to the array
              editor.canvas.add(circle); // Add the circle directly to the canvas
              currentDistance += interval;
            }
    
            editor.canvas.renderAll();
          };
    
          const createCircle = (x, y) => {
            const existingCircle = editor.canvas.getObjects().find(obj => {
              return obj.type === 'circle' && obj.left === x && obj.top === y;
            });
    
            if (!existingCircle) {
              const circle = new fabric.Circle({
                left: x,
                top: y,
                radius: 5,
                fill: 'blue',
                stroke: 'blue',
                strokeWidth: 2,
                padding: 50,
                name: 'MyCircle',
                selectable: false
              });
              return circle;
            }
            return null; // Return null if a circle already exists at the position
          };
    
          const mouseMoveHandler = (event) => {
            if (!isDragging) return;
            const pointer = editor.canvas.getPointer(event.e);
            createLineOfCircles(initialX, initialY, pointer.x, pointer.y);
          };
    
          const mouseUpHandler = () => {
            isDragging = false;
            if (!clicked) {
              const circle = createCircle(initialX, initialY);
              if (circle) {
                editor.canvas.add(circle); // Add the circle directly to the canvas if it doesn't already exist
                editor.canvas.renderAll();
              }
            }
          };
    
          editor.canvas.on('mouse:move', mouseMoveHandler);
          editor.canvas.on('mouse:up', mouseUpHandler);
    
          isDragging = true;
        }
      });
    }
    
    
    
    
  }, [editor, cropImage, color, canvas, addCircleMode, actionHandler, anchorWrapper]);

  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }
    if (objectsMovable) {
      editor.canvas.off('mouse:down');
      editor.canvas.forEachObject((obj) => {
        obj.set({
          selectable: true,
          evented: false,
          hasControls: true,
          hasBorders: true,
          lockMovementX: false,
          lockMovementY: false,
        });
      });
    } else {
      editor.canvas.forEachObject((obj) => {
        obj.set({
          selectable: false,
          evented: true,
          hasControls: false,
          hasBorders: false,
          lockMovementX: false,
          lockMovementY: false,
        });
      });
      editor.canvas.on('mouse:down', function (options) {
        const target = options.target;
        if (target && target.type === 'circle') {
          const currentFillColor = target.fill;
          const newFillColor = currentFillColor === 'orange' ? 'blue' : 'orange';
          target.set({ fill: newFillColor });
          editor.canvas.renderAll();
        }
      });
    }
  }, [editor, objectsMovable]);

  function updatePolygonPropertiesAndControls(obj, polygonPositionHandler, anchorWrapper, actionHandler) {
    // Update properties
    obj.set({
      fill: 'rgba(216, 27, 96, 0.5)',
      padding : 7, // Transparent fill color (rgba)
      strokeWidth: 4,
      stroke: 'green',
      objectCaching: false,
      transparentCorners: false,
      cornerStyle: 'circle',
      type: 'polygon',
    });

    // Set up custom controls and handlers for the polygon object
    obj.setControlsVisibility({
      mtr: true,
      bl: true,
      br: true,
      mb: true,
      ml: true,
      mr: true,
      mt: true,
      tl: true,
      tr: true,
    });

    // Loop through the points of the polygon and set up controls for each point
    obj.points.forEach((point, index) => {
      obj.controls[`p${index}`] = new fabric.Control({
        positionHandler: polygonPositionHandler,
        actionHandler: anchorWrapper(index > 0 ? index - 1 : obj.points.length - 1, actionHandler),
        actionName: 'modifyPolygon',
        pointIndex: index,
      });
    });
  }

  function polygonPositionHandler(this: { pointIndex: number }, dim: any, finalMatrix: any, fabricObject: any) {
    if (fabricObject.points && fabricObject.points.length > 0) {
      const x = fabricObject.points[this.pointIndex].x - fabricObject.pathOffset.x;
      const y = fabricObject.points[this.pointIndex].y - fabricObject.pathOffset.y;
      return fabric.util.transformPoint(
        { x: x, y: y },
        fabric.util.multiplyTransformMatrices(fabricObject.canvas.viewportTransform, fabricObject.calcTransformMatrix())
      );
    }
    return { x: 0, y: 0 }; // or any default value
  }

  function getObjectSizeWithStroke(object) {
    const stroke = new fabric.Point(object.strokeUniform ? 1 / object.scaleX : 1, object.strokeUniform ? 1 / object.scaleY : 1).multiply(
      object.strokeWidth
    );
    return new fabric.Point(object.width + stroke.x, object.height + stroke.y);
  }

  const HandleOnClick = (value) => {
    if (!editor) return;
    if (editor.canvas.isDrawingMode) {
      editor.canvas.isDrawingMode = !editor.canvas.isDrawingMode;
    }
    const activeObjects = editor.canvas.getActiveObjects();
    switch (value) {
      case "onAddLine":
        const line = new fabric.Line([50, 50, 200, 50], {
          top: 100,
          left: 100,
          fill: 'black',
          stroke: 'black',
          strokeWidth: 2,
          selectable: true,
          scaleX: 0.5, // Adjust scaling as needed
          scaleY: 0.5, // Adjust scaling as needed
          angle: 0, // Adjust rotation angle as needed
        });
        editor.canvas.add(line);
        editor.canvas.renderAll();
        break;
      case "onAddRectangle":
        editor.addRectangle()
        break;
      case "addText":
        editor.addText("insert text")
        break;
      case "ontoggleDraw":
        editor.canvas.isDrawingMode = !editor.canvas.isDrawingMode;
        break;
      case "clear":
        editor.canvas.setViewportTransform([1, 0, 0, 1, 0, 0]); // Reset viewport transform
        editor.canvas._objects = [];
        history.length = 0;
        localStorage.removeItem("canvasState");
        localStorage.removeItem("viewportTransform");
        editor.canvas.renderAll();
        break;
      case "removeSelectedObjects":
        activeObjects.forEach(object => {
          editor.canvas.remove(object);
        });
        editor.canvas.requestRenderAll();
        break;
      case "undo":
        const objects = editor.canvas._objects;
        if (objects.length > 0) {
          const poppedObject = objects.pop();
          if (poppedObject) {
            history.push(poppedObject as typeof history[number]);
          }
        }
        editor.canvas.renderAll();
        break;
      case "redo":
        if (history.length > 0) {
          editor.canvas.add(history.pop());
        }
        break;
      case "OnSave":
        const json = JSON.stringify(editor.canvas);
        localStorage.setItem("canvasState", json);
        const viewportTransform = JSON.stringify(editor.canvas.viewportTransform);
        localStorage.setItem("viewportTransform", viewportTransform);
        setCanvas({ ...editor.canvas })
        break;
      case "duplicateSelectedObject":
        const offset = 20;
        activeObjects.forEach((activeObject, index) => {
          if (activeObject) {
            activeObject.clone((cloned) => {
              if (cloned.type === "circle") {
                cloned.set({
                  left: activeObject.left,
                  top: activeObject.top + 200,
                });
              } else {
                cloned.set({
                  left: activeObject.left,
                  top: activeObject.top + offset * (index + 1),
                });
              }

              if (cloned.type === 'polygon') {
                // Update properties and controls for the cloned polygon
                updatePolygonPropertiesAndControls(cloned, polygonPositionHandler, anchorWrapper, actionHandler);
              }

              // Reset viewport transform for the cloned object
              cloned.viewportTransform = [1, 0, 0, 1, 0, 0];

              // Add the cloned object to the canvas
              editor.canvas.add(cloned);
              // Set the cloned object as the active object
              editor.canvas.setActiveObject(cloned);
              // Request render for the canvas
              editor.canvas.requestRenderAll();
            });
          }
        });
        break;

      default:
        break;
    }
  };
  const handlePolygonOptionClick = (option) => {
    // Handle the click based on the selected option
    let polygonPoints;
    switch (option) {
      case "Square":
        polygonPoints = squarePoints.map(point => ({ x: point.x, y: point.y }));
        break;
      case "Rectangle":
        polygonPoints = rectanglePoints.map(point => ({ x: point.x, y: point.y }));
        break;
      case "Normal":
        polygonPoints = Polygonpoints.map(point => ({ x: point.x, y: point.y }));
        break;
      default:
        polygonPoints = Polygonpoints.map(point => ({ x: point.x, y: point.y }));
        break;
    }


    onAddPolygon(polygonPoints)
    setShowPolygonOptions(false); // Close the options modal
  };
  const onAddPolygon = (Points) => {
    if (!editor || !editor.canvas) return; // Check if editor or canvas is undefined
    const polygon = new fabric.Polygon(Points, {
      left: 100,
      top: 50,
      scaleX: 4, // Adjust scaling as needed
      scaleY: 4, // Adjust scaling as needed
    });
    updatePolygonPropertiesAndControls(polygon, polygonPositionHandler, anchorWrapper, actionHandler);
    polygon.viewportTransform = [1, 0, 0, 1, 0, 0];
    editor.canvas.add(polygon);

  }
  return (
    <div>
      <h1>FabricJS Tool</h1>
      <div className="text-center">
        <span>{addCircleMode && "Off addcirclemode to add objects"}{!objectsMovable && "Enable objects to add objects"}{!cropImage && "Off Cropmode to add objects"}</span>
      </div>

      <div className="row">
        <div className="col-1">
          <div className="d-flex flex-column flex-start">
            <button className="" onClick={() => { HandleOnClick("OnSave"); setObjectsMovable(!objectsMovable); }} title={objectsMovable ? "Disable" : "Enable"} disabled={!cropImage || addCircleMode} >
              {objectsMovable ? <FaBan className="text-danger" /> : <FaCheckCircle className="text-success" />}
            </button>
            <button onClick={() => { HandleOnClick("OnSave"); setAddCircleMode(!addCircleMode); }} disabled={!cropImage || !objectsMovable} title={addCircleMode ? "stop circle" : "Add circle"}>
              {addCircleMode ? <BiStopCircle className="text-danger" /> : <FaCircle className="text-success" />}
            </button>
            <button onClick={() => HandleOnClick("duplicateSelectedObject")} disabled={!cropImage || !objectsMovable || addCircleMode} title="Duplicate Selected Design">
              <FaCopy />
            </button>
            <div className="polygon-options-container">
              <button
                onMouseEnter={() => setShowPolygonOptions(true)}
                disabled={!cropImage || !objectsMovable || addCircleMode}
              >
                <FaVectorSquare /> {""}
              </button>

              {/* Modal for polygon options */}
              {showPolygonOptions && (
                <div className="polygon-options-modal" onMouseLeave={() => setShowPolygonOptions(false)}>
                  <button onClick={() => handlePolygonOptionClick('Square')} title="Sqaure Polygon">
                    <FaSquare /> {""}
                  </button>
                  <button onClick={() => handlePolygonOptionClick('Rectangle')} title="Rectangle Polygon">
                    <FaMobile /> {""}
                  </button>
                  <button onClick={() => handlePolygonOptionClick('Normal')} title="Add Polygon">
                    <FaDrawPolygon />{""}
                  </button>
                </div>
              )}
            </div>

            <button onClick={() => HandleOnClick("onAddLine")} disabled={!cropImage || !objectsMovable || addCircleMode} title="Add Line"><FaMinus /></button>
            <button onClick={() => HandleOnClick("onAddRectangle")} disabled={!cropImage || !objectsMovable || addCircleMode} title="Add Rectangle"><FaSquare /></button>
            <button onClick={() => HandleOnClick("addText")} disabled={!cropImage || !objectsMovable || addCircleMode} title="Add Text"><FaTextWidth /></button>
            <button onClick={() => HandleOnClick("ontoggleDraw")} disabled={!cropImage || !objectsMovable || addCircleMode} title="Toggle draw"><FaPencilAlt /> </button>
            <button onClick={() => HandleOnClick("clear")} disabled={!cropImage || !objectsMovable || addCircleMode} title="ClearAll"><FaTrashAlt /> </button>
            <button onClick={() => HandleOnClick("undo")} disabled={!cropImage || !objectsMovable || addCircleMode} title="Undo"><FaUndo /> </button>
            <button onClick={() => HandleOnClick("redo")} disabled={!cropImage || !objectsMovable || addCircleMode} title="Redo"><FaRedo /> </button>
            <button onClick={() => HandleOnClick("removeSelectedObjects")} disabled={!cropImage || !objectsMovable || addCircleMode} title="RemoveSelectedObject"><FaTrash /> </button>
            <button onClick={() => { HandleOnClick("OnSave"); setCropImage(!cropImage) }} title={cropImage ? "CropAll" : "OFF Cropmode"} disabled={!objectsMovable || addCircleMode} ><FaCrop /> </button>
            <label htmlFor="colorPicker" title="Select Color">
              <FaPalette />
            </label>
            <input
              id="colorPicker"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              disabled={!cropImage || !objectsMovable || addCircleMode}
              title="Select Color"
              aria-label="Select Color"
            />
            <button onClick={() => HandleOnClick("OnSave")} disabled={!cropImage || !objectsMovable || addCircleMode} title="Save"><FaSave /> </button>

          </div>
        </div>
        <div className="col-11">
          <div className={` ${cropImage ? '' : 'dotted-border'}`}>
            <FabricJSCanvas className="sample-canvas" onReady={onReady} />
          </div>
        </div>
      </div>



    </div>
  );
}
export default FabricWrapper;