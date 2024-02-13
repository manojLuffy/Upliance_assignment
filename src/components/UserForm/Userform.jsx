import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as uuid from "uuid";
import styles from "./userform.module.css";

const LOCAL_STORAGE_KEY = "userData";

const UserForm = () => {
	const loadUsersFromStorage = () => {
		try {
			const storedUsers = localStorage.getItem(LOCAL_STORAGE_KEY);
			return storedUsers ? JSON.parse(storedUsers) : [];
		} catch (error) {
			console.error("Error loading from local storage:", error);
			return [];
		}
	};

	const saveUsersToStorage = (users) => {
		try {
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
		} catch (error) {
			console.error("Error saving to local storage:", error);
		}
	};
	const [users, setUsers] = useState(loadUsersFromStorage());

	// React Hook Form Setup
	const {
		register,
		handleSubmit,
		formState: { errors, isDirty }, // Form state
		reset,
	} = useForm({
		defaultValues: {
			// Populate defaults if needed
			name: "",
			address: "",
			email: "",
			phone: "",
		},
	});

	const generateUserId = () => uuid.v4();

	const onSubmit = (data) => {
		const newUser = {
			id: generateUserId(),
			...data,
		};
		setUsers([...users, newUser]);
		saveUsersToStorage([...users, newUser]);
		reset(); // Reset form after successful submission
	};

	useEffect(() => {
		const handleUnload = (event) => {
			if (isDirty) {
				event.preventDefault();
				event.returnValue = "";
			}
		};

		window.addEventListener("beforeunload", handleUnload);

		return () => {
			window.removeEventListener("beforeunload", handleUnload);
		};
	}, [isDirty]);

	return (
		<form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: "400px", margin: "0 auto" }}>
			<div className={styles.formGroup}>
				<label htmlFor="name">Name:</label>
				<input
					type="text"
					id="name"
					{...register("name", {
						required: "Name is required",
						minLength: { value: 3, message: "Name too short" },
					})}
				/>
				{errors.name && <p className={styles.errorMessage}>{errors.name.message}</p>}
			</div>
			<div className={styles.formGroup}>
				<label htmlFor="email">Email:</label>
				<input
					type="email"
					id="email"
					{...register("email", {
						required: "Email is required",
						pattern: {
							value: /^[^@]+@[^@]+\.[^@]+$/,
							message: "Invalid email format",
						},
					})}
				/>
				{errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
			</div>
			<div className={styles.formGroup}>
				<label htmlFor="address">Address:</label>
				<input
					type="text"
					id="address"
					{...register("address", {
						required: "Address is required",
						minLength: { value: 10, message: "Address should be at least 10 characters" },
					})}
				/>
				{errors.address && <p className={styles.errorMessage}>{errors.address.message}</p>}
			</div>

			<div className={styles.formGroup}>
				<label htmlFor="phone">Phone:</label>
				<input
					type="tel"
					id="phone"
					{...register("phone", {
						required: "Phone number is required",
						minLength: {
							value: 10,
							message: "Phone number must be at least 10 digits",
						},
					})}
				/>
				{errors.phone && <p className={styles.errorMessage}>{errors.phone.message}</p>}
			</div>

			<button type="submit">Submit</button>
		</form>
	);
};

export default UserForm;
