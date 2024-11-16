import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Redirect, useRouter } from 'expo-router';
import { useAuth } from '@/contexts/auth';

export default function Index() {
	return <Redirect href="/(trails)"/>
}