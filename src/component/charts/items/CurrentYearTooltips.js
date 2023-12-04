export function CustomFlyoutY1(flyoutComponentProps) {

}

export function CustomFlyoutY2(flyoutComponentProps) {
    
}

export function CustomFlyoutY3(flyoutComponentProps) {
    
}

export function CustomFlyoutY4(flyoutComponentProps) {
    const { x, y, dataColorSet } = flyoutComponentProps;

    const newX = x - 75;
    const newY = y - 0;
    

    return (
        <g>
            <rect width="150" height="34" x={newX} y={newY} rx={5} fill="#ffffff"  opacity={0.8} stroke={dataColorSet[3]} strokeWidth={3}/>
        </g>
    );
}

export function CustomFlyoutY5(flyoutComponentProps) {
    const { x, y, dataColorSet } = flyoutComponentProps;

    const newX = x - 75;
    const newY = y + 37;
    

    return (
        <g>
            <rect width="150" height="34" x={newX} y={newY} rx={5} fill="#ffffff"  opacity={0.8} stroke={dataColorSet[4]} strokeWidth={3}/>
        </g>
    );
    
}

export function CustomFlyoutY6(flyoutComponentProps) {
    const { x, y, dataColorSet } = flyoutComponentProps;

    const newX = x - 75;
    const newY = y + 71;
    

    return (
        <g>
            <rect width="150" height="34" x={newX} y={newY} rx={5} fill="#ffffff"  opacity={0.8} stroke={dataColorSet[5]} strokeWidth={3}/>
        </g>
    );
    
}