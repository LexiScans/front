import React, { useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  PanResponder,
  StyleSheet,
} from "react-native";
import Svg, { Path } from "react-native-svg";

interface SignatureCanvasProps {
  onSignatureChange?: (paths: { x: number; y: number }[][]) => void;
}

const SignatureCanvas: React.FC<SignatureCanvasProps> = ({
  onSignatureChange,
}) => {
  const [paths, setPaths] = useState<{ x: number; y: number }[][]>([]);
  const [currentPath, setCurrentPath] = useState<{ x: number; y: number }[]>(
    []
  );
  const svgRef = useRef<Svg>(null);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (event) => {
      const { locationX, locationY } = event.nativeEvent;
      setCurrentPath([{ x: locationX, y: locationY }]);
    },
    onPanResponderMove: (event) => {
      const { locationX, locationY } = event.nativeEvent;
      if (
        locationX >= 0 &&
        locationX <= 300 &&
        locationY >= 0 &&
        locationY <= 300
      ) {
        setCurrentPath((prev) => [...prev, { x: locationX, y: locationY }]);
      }
    },
    onPanResponderRelease: () => {
      if (currentPath.length > 1) {
        const allPaths = [...paths, currentPath];
        setPaths(allPaths);
        onSignatureChange?.(allPaths);
      }
      setCurrentPath([]);
    },
  });

  const clearCanvas = () => {
    setPaths([]);
    setCurrentPath([]);
    onSignatureChange?.([]);
  };

  const pointsToSvgPath = (points: { x: number; y: number }[]) => {
    if (points.length === 0) return "";
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++)
      path += ` L ${points[i].x} ${points[i].y}`;
    return path;
  };

  return (
    <View style={styles.canvasContainer}>
      <View style={styles.canvas} {...panResponder.panHandlers}>
        <Svg width="100%" height="100%" ref={svgRef}>
          {paths.map((p, i) => (
            <Path
              key={i}
              d={pointsToSvgPath(p)}
              stroke="#111"
              strokeWidth={2.5}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
          {currentPath.length > 0 && (
            <Path
              d={pointsToSvgPath(currentPath)}
              stroke="#111"
              strokeWidth={2.5}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </Svg>
      </View>
      <TouchableOpacity style={styles.clearButton} onPress={clearCanvas}>
        <Text style={styles.clearButtonText}>🧹 Limpiar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  canvasContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  canvas: {
    width: 300,
    height: 300,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  clearButton: {
    marginTop: 8,
    backgroundColor: "#FF6B6B",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  clearButtonText: { color: "#fff", fontWeight: "600" },
});

export default SignatureCanvas;
