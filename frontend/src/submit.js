// submit.js
import { useEffect, useRef } from "react";
import { useStore } from "./store";
import { toast } from "sonner";

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const antsRef = useRef(null);
  const animationFrameId = useRef(null);
  const currentSpeed = useRef(0);
  const offset = useRef(0);
  const isHovered = useRef(false);
  const patternLenRef = useRef(0);

  const dash = 6;
  const gap = 10;
  const maxSpeed = 0.15;

  useEffect(() => {
    if (!antsRef.current) return;

    const length = antsRef.current.getTotalLength();
    const pattern = dash + gap;
    const count = Math.floor(length / pattern);
    const rest = length - count * pattern;
    const realGap = gap + rest / count;

    patternLenRef.current = dash + realGap;
    antsRef.current.style.strokeDasharray = `${dash} ${realGap}`;

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  const animate = () => {
    if (isHovered.current) {
      currentSpeed.current += (maxSpeed - currentSpeed.current) * 0.08;
    } else {
      currentSpeed.current += (0 - currentSpeed.current) * 0.05;
    }

    offset.current -= currentSpeed.current;

    if (Math.abs(offset.current) >= patternLenRef.current) {
      offset.current = offset.current % patternLenRef.current;
    }

    if (antsRef.current) {
      antsRef.current.style.strokeDashoffset = offset.current;
    }

    if (!isHovered.current && currentSpeed.current < 0.005) {
      currentSpeed.current = 0;
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
      return;
    }

    animationFrameId.current = requestAnimationFrame(animate);
  };

  const handleMouseEnter = () => {
    isHovered.current = true;
    if (!animationFrameId.current) {
      animationFrameId.current = requestAnimationFrame(animate);
    }
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
  };

  const handleSubmit = async () => {
    const toastId = toast.loading("Analyzing pipeline structure...");

    try {
      const response = await fetch("http://127.0.0.1:8000/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error("Server responded with an error");
      }

      const data = await response.json();

      const dagStatus = `Is DAG: ${data.is_dag ? "Yes" : "No"}`;

      if (data.is_dag) {
        toast.success("Pipeline validated successfully! No cycles found.", {
          id: toastId,
          description: `Nodes: ${data.num_nodes} | Edges: ${data.num_edges} | ${dagStatus}`,
        });
      } else {
        toast.error("Validation Failed: Graph contains cycles!", {
          id: toastId,
          description: (
            <>
              Nodes: {data.num_nodes} | Edges: {data.num_edges} | {dagStatus}
              <br />
              Please remove loops/circular connections.
            </>
          ),
        });
      }
    } catch (error) {
      toast.error("Database/Server Error", {
        id: toastId,
        description:
          "Could not connect to the backend server. Is Python running?",
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "20px 0",
      }}
    >
      <button
        onClick={handleSubmit}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="submit-pipeline-btn"
      >
        <span className="submit-pipeline-btn__label">Submit Pipeline</span>
        <svg
          className="submit-pipeline-btn__outline"
          viewBox="0 0 160 48"
          preserveAspectRatio="none"
        >
          <path
            className="submit-pipeline-btn__base"
            d="M17 1 H143 Q159 1 159 17 V31 Q159 47 143 47 H17 Q1 47 1 31 V17 Q1 1 17 1"
          />
          <path
            ref={antsRef}
            className="submit-pipeline-btn__ants"
            d="M17 1 H143 Q159 1 159 17 V31 Q159 47 143 47 H17 Q1 47 1 31 V17 Q1 1 17 1"
          />
        </svg>
      </button>
    </div>
  );
};
