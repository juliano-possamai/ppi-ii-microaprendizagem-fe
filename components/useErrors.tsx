import { ErrorInterface } from "@/types/commomTypes";
import { useState } from "react";

export default function useErrors() {
	const emptyErrors: ErrorInterface = { message: '', errors: [] };
	const [errors, setErrors] = useState<ErrorInterface>(emptyErrors);

	const clearErrors = () => setErrors(emptyErrors);
	const getErrorField = (field: string) => errors.errors.find(error => error.field === field)?.error;

	return {
		errors,
		setErrors,
		getErrorField,
		clearErrors
	}
}