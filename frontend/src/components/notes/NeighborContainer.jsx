import { useState, useEffect } from "react";
import NeighborNote from "./NeighborNote";

export default function NeighborContainer(props) {
  const [neighbors, setNeighbors] = useState([]);

  useEffect(() => {
    if (props.adjacent == null) {
      setNeighbors([]);
    } else {
      const neighborComponents = props.adjacent.map((n) => (
        <NeighborNote key={n} noteId={n} />
      ));
      setNeighbors(neighborComponents);
    }
  }, [props.adjacent]);

  return (
    <div className="w-full flex flex-wrap overflow-hidden overflow-x-scroll bg-pink-400">
        {neighbors}
    </div>
  );
}
