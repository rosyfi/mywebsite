"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

interface ThemedImageProp {
  name: string;
  width: number;
  height: number;
}

const ThemedImage: React.FC<ThemedImageProp> = ({ name, width, height }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const src = mounted && resolvedTheme === "dark"
    ? `/dark/${name}.svg`
    : `/light/${name}.svg`;

  return (
    <Image
      style={{ maxWidth: "100%", height: "fit-content" }}
      src={src}
      alt={name}
      width={width}
      height={height}
    />
  );
};

export default ThemedImage;
