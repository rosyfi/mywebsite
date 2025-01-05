import Image from "next/image";
import { useTheme } from "next-themes";

interface ThemedImageProp {
  name: string;
  width: number;
  height: number;
}

const ThemedImage: React.FC<ThemedImageProp> = ({ name, width, height }) => {
  const { resolvedTheme } = useTheme();
  let src;

  switch (resolvedTheme) {
    case "light":
      src = `/light/${name}.svg`;
      break;
    case "dark":
      src = `/dark/${name}.svg`;
      break;
    default:
      src = `/light/${name}.svg`;
      break;
  }

  return (
    <Image
      style={{ maxWidth: "100%" }}
      src={src}
      alt={name}
      width={width}
      height={height}
    />
  );
};

export default ThemedImage;
