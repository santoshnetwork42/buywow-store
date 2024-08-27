import { Button, Img } from "@/components/elements";
import React from "react";

const RemoveButton = ({ onClick }) => (
  <Button
    className="h-7 w-8 rounded-md bg-lime-50"
    onClick={onClick}
    title="Remove this product"
    enableRipple={false}
  >
    <div className="aspect-[10/14] w-2.5 md:w-3">
      <Img
        src="img_thumbs_up.svg"
        width={10}
        height={14}
        className="aspect-[10/14] h-auto w-full object-contain"
        isStatic
      />
    </div>
  </Button>
);

export default React.memo(RemoveButton);
