'use client'
import { useRef, useEffect, useState } from "react";
import { Circle, Square, Type, Image, MousePointer, Hand, Minus, Plus, Download, Trash2, Undo, Redo, Copy, Menu, ChevronDown, Search, Star, MessageSquare, Play, Settings, Bell, User, Maximize2, Lock, Eye, EyeOff, AlignLeft, AlignCenter, AlignRight, AlignJustify, Bold, Italic, Underline } from "lucide-react";

export default function FigmaClone() {
  const canvasRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [tool, setTool] = useState("select");
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [fillColor, setFillColor] = useState("#0066FF");
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState(1);
  const [fontSize, setFontSize] = useState(16);
  const [fontWeight, setFontWeight] = useState("normal");
  const [textAlign, setTextAlign] = useState("left");
  const [cornerRadius, setCornerRadius] = useState(0);
  const [opacity, setOpacity] = useState(100);
  const [zoom, setZoom] = useState(100);
  const [showGrid, setShowGrid] = useState(false);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });

  const colorPresets = [
    "#0066FF", "#00D4AA", "#FF6B6B", "#FFC107", "#9C27B0",
    "#000000", "#FFFFFF", "#F1F3F4", "#5F6368", "#202124"
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth - 600;
    canvas.height = window.innerHeight - 40;
    drawCanvas();
  }, [elements, selectedElement, showGrid, zoom, panOffset]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#E5E5E5";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(panOffset.x, panOffset.y);
    ctx.scale(zoom / 100, zoom / 100);

    if (showGrid) drawGrid(ctx);

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(50, 50, canvas.width / (zoom / 100) - 100, canvas.height / (zoom / 100) - 100);

    elements.forEach((el, idx) => drawElement(ctx, el, idx === selectedElement));

    ctx.restore();
  };

  const drawGrid = (ctx) => {
    ctx.strokeStyle = "#D0D0D0";
    ctx.lineWidth = 0.5;
    const gridSize = 10;
    const width = ctx.canvas.width / (zoom / 100);
    const height = ctx.canvas.height / (zoom / 100);

    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const drawElement = (ctx, el, isSelected) => {
    ctx.save();
    ctx.globalAlpha = (el.opacity || 100) / 100;

    if (el.type === "rectangle" || el.type === "frame") {
      ctx.fillStyle = el.fill || "#0066FF";
      if (el.cornerRadius > 0) {
        drawRoundedRect(ctx, el.x, el.y, el.width, el.height, el.cornerRadius);
        ctx.fill();
      } else {
        ctx.fillRect(el.x, el.y, el.width, el.height);
      }
      
      if (el.strokeWidth > 0) {
        ctx.strokeStyle = el.stroke || "#000000";
        ctx.lineWidth = el.strokeWidth;
        if (el.cornerRadius > 0) {
          drawRoundedRect(ctx, el.x, el.y, el.width, el.height, el.cornerRadius);
          ctx.stroke();
        } else {
          ctx.strokeRect(el.x, el.y, el.width, el.height);
        }
      }

      if (el.type === "frame") {
        ctx.fillStyle = "#000000";
        ctx.font = "11px Inter, sans-serif";
        ctx.fillText(el.name || "Frame", el.x, el.y - 6);
      }
    } else if (el.type === "circle") {
      const radius = Math.min(el.width, el.height) / 2;
      const centerX = el.x + el.width / 2;
      const centerY = el.y + el.height / 2;
      
      ctx.fillStyle = el.fill || "#0066FF";
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();
      
      if (el.strokeWidth > 0) {
        ctx.strokeStyle = el.stroke || "#000000";
        ctx.lineWidth = el.strokeWidth;
        ctx.stroke();
      }
    } else if (el.type === "text") {
      ctx.fillStyle = el.fill || "#000000";
      ctx.font = `${el.fontWeight || "normal"} ${el.fontSize || 16}px Inter, sans-serif`;
      ctx.textAlign = el.textAlign || "left";
      ctx.fillText(el.text || "Text", el.x, el.y + (el.fontSize || 16));
    }

    if (isSelected) {
      ctx.strokeStyle = "#0066FF";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([]);
      ctx.strokeRect(el.x - 2, el.y - 2, el.width + 4, el.height + 4);
      
      // Selection handles
      const handles = [
        [el.x - 4, el.y - 4], [el.x + el.width / 2 - 4, el.y - 4], [el.x + el.width, el.y - 4],
        [el.x - 4, el.y + el.height / 2 - 4], [el.x + el.width, el.y + el.height / 2 - 4],
        [el.x - 4, el.y + el.height], [el.x + el.width / 2 - 4, el.y + el.height], [el.x + el.width, el.y + el.height]
      ];
      
      ctx.fillStyle = "#FFFFFF";
      ctx.strokeStyle = "#0066FF";
      handles.forEach(([hx, hy]) => {
        ctx.fillRect(hx, hy, 8, 8);
        ctx.strokeRect(hx, hy, 8, 8);
      });
    }

    ctx.restore();
  };

  const drawRoundedRect = (ctx, x, y, width, height, radius) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };

  const handleCanvasMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - panOffset.x) / (zoom / 100);
    const y = (e.clientY - rect.top - panOffset.y) / (zoom / 100);

    if (tool === "select") {
      let found = -1;
      for (let i = elements.length - 1; i >= 0; i--) {
        const el = elements[i];
        if (x >= el.x && x <= el.x + el.width && y >= el.y && y <= el.y + el.height) {
          found = i;
          break;
        }
      }
      setSelectedElement(found);
      if (found >= 0) {
        setIsDragging(true);
        setDragStart({ x: x - elements[found].x, y: y - elements[found].y });
      }
    } else if (tool === "hand") {
      setIsDragging(true);
      setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    } else {
      setIsDragging(true);
      setDragStart({ x, y });
    }
  };

  const handleCanvasMouseMove = (e) => {
    if (!isDragging) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - panOffset.x) / (zoom / 100);
    const y = (e.clientY - rect.top - panOffset.y) / (zoom / 100);

    if (tool === "select" && selectedElement !== null) {
      const newElements = [...elements];
      newElements[selectedElement] = {
        ...newElements[selectedElement],
        x: x - dragStart.x,
        y: y - dragStart.y
      };
      setElements(newElements);
    } else if (tool === "hand") {
      setPanOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleCanvasMouseUp = (e) => {
    if (isDragging && tool !== "select" && tool !== "hand") {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - panOffset.x) / (zoom / 100);
      const y = (e.clientY - rect.top - panOffset.y) / (zoom / 100);
      
      const width = Math.abs(x - dragStart.x);
      const height = Math.abs(y - dragStart.y);
      
      if (width > 5 && height > 5) {
        const newElement = {
          type: tool,
          x: Math.min(dragStart.x, x),
          y: Math.min(dragStart.y, y),
          width,
          height,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth,
          fontSize,
          fontWeight,
          textAlign,
          cornerRadius,
          opacity,
          text: tool === "text" ? "Text" : undefined,
          name: tool === "frame" ? "Frame" : undefined
        };
        setElements([...elements, newElement]);
        setSelectedElement(elements.length);
        setTool("select");
      }
    }
    setIsDragging(false);
  };

  const updateSelectedElement = (updates) => {
    if (selectedElement !== null) {
      const newElements = [...elements];
      newElements[selectedElement] = { ...newElements[selectedElement], ...updates };
      setElements(newElements);
    }
  };

  const deleteSelected = () => {
    if (selectedElement !== null) {
      setElements(elements.filter((_, idx) => idx !== selectedElement));
      setSelectedElement(null);
    }
  };

  const duplicateSelected = () => {
    if (selectedElement !== null) {
      const el = elements[selectedElement];
      const newEl = { ...el, x: el.x + 20, y: el.y + 20 };
      setElements([...elements, newEl]);
      setSelectedElement(elements.length);
    }
  };

  const selectedEl = selectedElement !== null ? elements[selectedElement] : null;

  return (
    <div className="flex flex-col h-screen bg-zinc-950">
      {/* Top Toolbar - Figma Style */}
      <div className="h-10 bg-zinc-900 border-b border-zinc-800 flex items-center px-2 gap-1 text-zinc-300">
        <button className="p-2 hover:bg-zinc-800 rounded">
          <Menu className="w-4 h-4" />
        </button>
        
        <div className="flex items-center gap-1 ml-2">
          <button className="px-3 py-1 hover:bg-zinc-800 rounded text-sm flex items-center gap-1">
            Untitled <ChevronDown className="w-3 h-3" />
          </button>
        </div>

        <div className="w-px h-6 bg-zinc-800 mx-2"></div>

        {/* Tools */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => setTool("select")}
            className={`p-2 rounded ${tool === "select" ? "bg-zinc-800 text-white" : "hover:bg-zinc-800"}`}
            title="Move (V)"
          >
            <MousePointer className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTool("hand")}
            className={`p-2 rounded ${tool === "hand" ? "bg-zinc-800 text-white" : "hover:bg-zinc-800"}`}
            title="Hand (H)"
          >
            <Hand className="w-4 h-4" />
          </button>
        </div>

        <div className="w-px h-6 bg-zinc-800 mx-1"></div>

        <div className="flex items-center gap-0.5">
          <button
            onClick={() => setTool("frame")}
            className={`p-2 rounded ${tool === "frame" ? "bg-zinc-800 text-white" : "hover:bg-zinc-800"}`}
            title="Frame (F)"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTool("rectangle")}
            className={`p-2 rounded ${tool === "rectangle" ? "bg-zinc-800 text-white" : "hover:bg-zinc-800"}`}
            title="Rectangle (R)"
          >
            <Square className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTool("circle")}
            className={`p-2 rounded ${tool === "circle" ? "bg-zinc-800 text-white" : "hover:bg-zinc-800"}`}
            title="Ellipse (O)"
          >
            <Circle className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTool("text")}
            className={`p-2 rounded ${tool === "text" ? "bg-zinc-800 text-white" : "hover:bg-zinc-800"}`}
            title="Text (T)"
          >
            <Type className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1"></div>

        {/* Right Side Actions */}
        <button className="p-2 hover:bg-zinc-800 rounded" title="Present">
          <Play className="w-4 h-4" />
        </button>
        <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm text-white">
          Share
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Layers */}
        <div className="w-60 bg-zinc-900 border-r border-zinc-800 flex flex-col">
          <div className="p-3 border-b border-zinc-800">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-2 top-2 text-zinc-500" />
              <input
                type="text"
                placeholder="Search layers"
                className="w-full bg-zinc-800 border border-zinc-700 rounded pl-8 pr-3 py-1.5 text-xs text-zinc-300 placeholder-zinc-500"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2">
            <div className="text-xs font-medium text-zinc-500 mb-2 px-2">LAYERS</div>
            {elements.length === 0 ? (
              <div className="text-xs text-zinc-600 py-8 text-center">No layers</div>
            ) : (
              <div className="space-y-0.5">
                {elements.map((el, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedElement(idx)}
                    className={`w-full px-2 py-1.5 rounded text-left text-xs transition-all flex items-center gap-2 ${
                      selectedElement === idx
                        ? "bg-blue-600 text-white"
                        : "text-zinc-400 hover:bg-zinc-800"
                    }`}
                  >
                    {el.type === "rectangle" && <Square className="w-3 h-3" />}
                    {el.type === "circle" && <Circle className="w-3 h-3" />}
                    {el.type === "text" && <Type className="w-3 h-3" />}
                    {el.type === "frame" && <Maximize2 className="w-3 h-3" />}
                    <span className="flex-1 truncate">{el.name || el.text || el.type}</span>
                    <Eye className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 relative">
          <canvas
            ref={canvasRef}
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
            onMouseLeave={handleCanvasMouseUp}
            className="w-full h-full cursor-crosshair"
          />
          
          {/* Zoom Controls */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white rounded-lg shadow-lg px-2 py-1.5">
            <button onClick={() => setZoom(Math.max(10, zoom - 10))} className="p-1 hover:bg-gray-100 rounded">
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-xs w-12 text-center">{zoom}%</span>
            <button onClick={() => setZoom(Math.min(400, zoom + 10))} className="p-1 hover:bg-gray-100 rounded">
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Right Sidebar - Properties */}
        <div className="w-60 bg-zinc-900 border-l border-zinc-800 overflow-y-auto">
          {selectedEl ? (
            <div className="p-4 space-y-4">
              <div className="text-xs font-medium text-zinc-500">DESIGN</div>
              
              {/* Fill */}
              <div>
                <label className="text-xs text-zinc-400 mb-1.5 block">Fill</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={selectedEl.fill}
                    onChange={(e) => updateSelectedElement({ fill: e.target.value })}
                    className="w-10 h-8 rounded border border-zinc-700 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={selectedEl.fill}
                    onChange={(e) => updateSelectedElement({ fill: e.target.value })}
                    className="flex-1 bg-zinc-800 border border-zinc-700 rounded px-2 py-1.5 text-xs text-zinc-300"
                  />
                </div>
              </div>

              {/* Stroke */}
              {selectedEl.type !== "text" && (
                <div>
                  <label className="text-xs text-zinc-400 mb-1.5 block">Stroke</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="color"
                      value={selectedEl.stroke}
                      onChange={(e) => updateSelectedElement({ stroke: e.target.value })}
                      className="w-10 h-8 rounded border border-zinc-700 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={selectedEl.stroke}
                      onChange={(e) => updateSelectedElement({ stroke: e.target.value })}
                      className="flex-1 bg-zinc-800 border border-zinc-700 rounded px-2 py-1.5 text-xs text-zinc-300"
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={selectedEl.strokeWidth}
                    onChange={(e) => updateSelectedElement({ strokeWidth: Number(e.target.value) })}
                    className="w-full h-1 bg-zinc-700 rounded accent-blue-600"
                  />
                  <div className="text-xs text-zinc-500 mt-1">{selectedEl.strokeWidth}px</div>
                </div>
              )}

              {/* Corner Radius */}
              {selectedEl.type === "rectangle" && (
                <div>
                  <label className="text-xs text-zinc-400 mb-1.5 block">Corner Radius</label>
                  <input
                    type="number"
                    value={selectedEl.cornerRadius || 0}
                    onChange={(e) => updateSelectedElement({ cornerRadius: Number(e.target.value) })}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded px-2 py-1.5 text-xs text-zinc-300"
                  />
                </div>
              )}

              {/* Text Properties */}
              {selectedEl.type === "text" && (
                <>
                  <div>
                    <label className="text-xs text-zinc-400 mb-1.5 block">Text</label>
                    <input
                      type="text"
                      value={selectedEl.text}
                      onChange={(e) => updateSelectedElement({ text: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded px-2 py-1.5 text-xs text-zinc-300"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 mb-1.5 block">Font Size</label>
                    <input
                      type="number"
                      value={selectedEl.fontSize}
                      onChange={(e) => updateSelectedElement({ fontSize: Number(e.target.value) })}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded px-2 py-1.5 text-xs text-zinc-300"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 mb-1.5 block">Text Align</label>
                    <div className="flex gap-1">
                      {["left", "center", "right"].map((align) => (
                        <button
                          key={align}
                          onClick={() => updateSelectedElement({ textAlign: align })}
                          className={`flex-1 p-2 rounded ${selectedEl.textAlign === align ? "bg-zinc-700" : "bg-zinc-800 hover:bg-zinc-700"}`}
                        >
                          {align === "left" && <AlignLeft className="w-4 h-4 mx-auto" />}
                          {align === "center" && <AlignCenter className="w-4 h-4 mx-auto" />}
                          {align === "right" && <AlignRight className="w-4 h-4 mx-auto" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Opacity */}
              <div>
                <label className="text-xs text-zinc-400 mb-1.5 block">Opacity</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={selectedEl.opacity}
                  onChange={(e) => updateSelectedElement({ opacity: Number(e.target.value) })}
                  className="w-full h-1 bg-zinc-700 rounded accent-blue-600"
                />
                <div className="text-xs text-zinc-500 mt-1">{selectedEl.opacity}%</div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-zinc-800 space-y-2">
                <button
                  onClick={duplicateSelected}
                  className="w-full px-3 py-2 bg-zinc-800 hover:bg-zinc-700 rounded text-xs text-zinc-300 flex items-center justify-center gap-2"
                >
                  <Copy className="w-3 h-3" />
                  Duplicate
                </button>
                <button
                  onClick={deleteSelected}
                  className="w-full px-3 py-2 bg-red-900/20 hover:bg-red-900/30 rounded text-xs text-red-400 flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-zinc-600">
              Select a layer to edit properties
            </div>
          )}
        </div>
      </div>
    </div>
  );
}