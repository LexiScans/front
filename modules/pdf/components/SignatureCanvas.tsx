import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  PanResponder,
  StyleSheet,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { captureRef } from "react-native-view-shot";

interface SignatureCanvasProps {
  onSignatureChange?: (paths: { x: number; y: number }[][]) => void;
  onSignatureBase64?: (base64: string) => void;
}

const SignatureCanvas: React.FC<SignatureCanvasProps> = ({
  onSignatureChange,
  onSignatureBase64,
}) => {
  const [paths, setPaths] = useState<{ x: number; y: number }[][]>([]);
  const [currentPath, setCurrentPath] = useState<{ x: number; y: number }[]>(
    []
  );
  const svgRef = useRef<View>(null);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (event) => {
      const { locationX, locationY } = event.nativeEvent;
      setCurrentPath([{ x: locationX, y: locationY }]);
    },
    onPanResponderMove: (event) => {
      const { locationX, locationY } = event.nativeEvent;
      setCurrentPath((prev) => [...prev, { x: locationX, y: locationY }]);
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

  const exportBase64 = async () => {
    if (!svgRef.current) return;
    const uri = await captureRef(svgRef.current, {
      format: "png",
      result: "base64",
    });
    onSignatureBase64?.(uri);
  };

  useEffect(() => {
    if (paths.length > 0) exportBase64();
  }, [paths]);

  return (
    <View style={materialStyles.canvasContainer}>
      <View
        style={materialStyles.canvasCard}
        {...panResponder.panHandlers}
        ref={svgRef}
      >
        <Svg width="100%" height="100%">
          {paths.map((p, i) => (
            <Path
              key={i}
              d={pointsToSvgPath(p)}
              stroke="#0b2e42ff"
              strokeWidth={3}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
          {currentPath.length > 0 && (
            <Path
              d={pointsToSvgPath(currentPath)}
              stroke="#0b2e42ff"
              strokeWidth={3}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </Svg>
      </View>

      <TouchableOpacity
        style={materialStyles.clearButton}
        onPress={clearCanvas}
      >
        <Text style={materialStyles.clearButtonText}>🧹 Limpiar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignatureCanvas;

const materialStyles = StyleSheet.create({
  canvasContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
  },
  canvasCard: {
    width: 320,
    height: 320,
    backgroundColor: "#fff",
    borderRadius: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    borderWidth: 0.5,
    borderColor: "#E5E7EB",
  },
  clearButton: {
    marginTop: 12,
    backgroundColor: "#0b2e42ff",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 8,
    elevation: 2,
  },
  clearButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
