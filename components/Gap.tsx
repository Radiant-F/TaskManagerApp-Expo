import { DimensionValue, View } from "react-native";

type Props = {
  width?: DimensionValue | undefined;
  height?: DimensionValue | undefined;
  margin?: DimensionValue | undefined;
  marginHorizontal?: DimensionValue | undefined;
  marginVertical?: DimensionValue | undefined;
  marginBottom?: DimensionValue | undefined;
  marginTop?: DimensionValue | undefined;
  marginLeft?: DimensionValue | undefined;
  marginRight?: DimensionValue | undefined;
};

export default function Gap({
  height,
  margin,
  marginBottom,
  marginHorizontal,
  marginLeft,
  marginRight,
  marginTop,
  marginVertical,
  width,
}: Props) {
  return (
    <View
      style={{
        height,
        margin,
        marginBottom,
        marginHorizontal,
        marginLeft,
        marginRight,
        marginTop,
        marginVertical,
        width,
      }}
    />
  );
}
