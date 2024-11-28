import { useEffect, useState } from 'react';
import { useLoading } from '@/contexts/loading';
import { useAuth } from '@/contexts/auth';
import { Redirect } from 'expo-router';

export default function Index() {
	const auth = useAuth();
	const { setLoading } = useLoading();
	const [redirectToLogin, setRedirectToLogin] = useState(false);

	useEffect(() => {
		setLoading(auth.isLoading);
		if (!auth.isLoading) {
			setRedirectToLogin(!auth.isAuthenticated);
		}
	}, [auth.isLoading, auth.isAuthenticated]);

	if (auth.isLoading) {
		return;
	}

	if (redirectToLogin) {
		return <Redirect href="/(auth)/login" />;
	}

	return <Redirect href="/(trails)" />;
}