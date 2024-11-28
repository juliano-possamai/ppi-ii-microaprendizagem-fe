import { useAuth } from "@/contexts/auth";

export default function Logout() {
	const { signOut } = useAuth();
	signOut();
}