import * as React from 'react';
import { Stage, Layer, Line } from 'react-konva';
import Konva from 'konva';
import ReactDOM from 'react-dom';

type Tools = "pen" | "eraser";

interface DoodleCanvasProps {
    attachedElement: Element;
}

interface LineInfo {
    tool: Tools;
    points: number[];
}

const Doodle = {
    startDoodle: () => { },
    stopDoodle: () => { },
    setTool: (tool: Tools) => { },
    getDrawing: (): any => [],
    clearDoodle: () => { }
}

const DoodleCanvas: React.FC<DoodleCanvasProps> = (props: DoodleCanvasProps) => {
    const [tool, changeTool] = React.useState<Tools>("pen");
    Doodle.setTool = changeTool;

    const [lines, setLines] = React.useState<LineInfo[]>([]);
    Doodle.getDrawing = () => lines;
    Doodle.clearDoodle = () => setLines([]);

    const [active, changeActive] = React.useState(false);
    Doodle.startDoodle = () => changeActive(true);
    Doodle.stopDoodle = () => changeActive(false);

    // Done for efficiency purposes - no need to re-render component when this changes.
    const isDrawing = React.useRef(false);

    if (!active) {
        //return null;
    }
    const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
        const target = e.target;
        if (target == null) {
            return;
        }
        const stage = target.getStage();
        if (stage == null) {
            return;
        }
        const pos = stage.getPointerPosition();
        if (pos == null) {
            return;
        }
        // Set so they're drawing, and create the start point of the first line they drew.
        isDrawing.current = true;
        setLines([...lines, { tool: tool, points: [pos.x, pos.y] }]);
    };

    const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
        // no drawing - skipping
        if (!isDrawing.current) {
            return;
        }
        const stage = e.target.getStage();
        if (stage == null) {
            return;
        }
        const point = stage.getPointerPosition();
        if (point == null) {
            return;
        }
        const lastLine = lines[lines.length - 1];
        // add point to current line
        const updatedLine: LineInfo = {
            tool: lastLine.tool,
            points: lastLine.points.concat([point.x, point.y])
        }
        setLines(lines.slice(0, lines.length - 1).concat([updatedLine]));
    };

    const handleMouseUp = () => {
        // If they didn't move the cursor at all, make a point here so a dot shows up
        if (lines[lines.length - 1].points.length <= 2) {
            const lastLine = lines[lines.length - 1];
            const updatedLine: LineInfo = {
                tool: lastLine.tool,
                points: lastLine.points.concat(lastLine.points)
            }
            setLines(lines.slice(0, lines.length - 1).concat([updatedLine]));
        }
        isDrawing.current = false;
    };

    return (
        <div style={{
            position: "absolute",
            top: props.attachedElement.getBoundingClientRect().top + window.scrollY,
            left: props.attachedElement.getBoundingClientRect().left + window.scrollX,
            backgroundColor: active ? "rgba(0, 0, 0, 0.2)" : undefined,
            pointerEvents: active ? undefined : "none"
        }}>
            <Stage
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                width={props.attachedElement.getBoundingClientRect().width}
                height={props.attachedElement.getBoundingClientRect().height}
            >
                <Layer>
                    {lines.map((line, i) => (
                        <Line
                            key={i}
                            points={line.points}
                            stroke="red"
                            strokeWidth={5}
                            tension={0.5}
                            lineCap="round"
                            globalCompositeOperation={
                                line.tool === 'pen' ? 'source-over' : 'destination-out'
                            }
                        />
                    ))}
                </Layer>
            </Stage>
        </div>
    );
};

ReactDOM.render(
    <DoodleCanvas attachedElement={document.getElementsByClassName("scholarship")[0]} />,
    document.getElementById('doodleroot')
);

export { Doodle }