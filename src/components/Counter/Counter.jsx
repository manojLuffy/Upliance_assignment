import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import styles from "./counter.module.css";
import RichTextEditor from "../TipTapEditor/RichTextEditor";
import Chart from "../Chart";
import UserForm from "../UserForm/Userform";

const Counter = () => {
	const [count, setCount] = useState(0);

	const backgroundAnimation = useSpring({
		from: { level: 0 },
		to: { level: count },
		config: { mass: 1, tension: 200, friction: 30 },
	});

	const backgroundStyle = {
		background: backgroundAnimation.level.to(
			(level) => `linear-gradient(to bottom, rgba(0, 128, 255, ${level / 100}), rgba(100, 180, 255, ${level / 100}))`
		),
		width: "100%",
		height: backgroundAnimation.level.to((level) => `${level + 100}px`),
		boxShadow: "0px 5px 10px rgba(0,0,0,0.1)",
		borderRadius: "10px",
	};

	const increment = () => setCount((prevCount) => prevCount + 1);
	const decrement = () => setCount((prevCount) => Math.max(0, prevCount - 1)); // Prevent negative
	const reset = () => setCount(0);

	return (
		<>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(2, 1fr)",
					gridTemplateRows: "repeat(2, 1fr)",
					gap: "20px",
					justifyContent: "center",
					alignItems: "center",
					padding: "40px",
					height: "100vh",
				}}>
				<div>
					<div className={styles["counter-container"]}>
						<animated.div className={styles["background"]} style={backgroundStyle}>
							<div className={styles["count-display"]}>{count}</div>
						</animated.div>
						<div className={styles["button-group"]}>
							<button onClick={increment}>Increment</button>
							<button onClick={decrement}>Decrement</button>
							<button onClick={reset}>Reset</button>
						</div>
					</div>
				</div>
				<div>
					<RichTextEditor />
				</div>
				<div>
					<Chart />
				</div>
				<div>
					<UserForm />
				</div>
			</div>
		</>
	);
};

export default Counter;
