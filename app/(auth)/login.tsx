import { View, Text, Image, TouchableOpacity } from 'react-native'
import { styles } from '@/styles/auth.styles'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants/theme'
import { useSSO } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'

export default function login() {

    const { startSSOFlow } = useSSO()
    const router = useRouter();

    const handleGoogleSignIn = async () => {
        try {
            const { createdSessionId, setActive } = await startSSOFlow({ strategy: "oauth_google" })

            if (setActive && createdSessionId){
                setActive({session:createdSessionId})
                router.replace("/(tabs)")
            }
        } catch (error) {
            console.error("OAuth error: ", error)
        }
    }


    return (
        <View style={styles.container} >
            {/* Brand Section */}
            <View style={styles.brandSection}>
                <View>
                    <Ionicons name='book-outline' size={32} color={COLORS.primary} />
                </View>
                <Text style={styles.appName}>Faith Feed</Text>
                <Text style={styles.tagline}>Feed Your Spirit, Not the Noise</Text>
            </View>

            {/* Illustration */}
            <View style={styles.illustrationContainer}>
                <Image
                    source={require("../../assets/images/authImage.png")}
                    style={styles.illustration}
                    resizeMode='cover'
                />
            </View>

            {/* Login Section */}

            <View style={styles.loginSection}>
                <TouchableOpacity
                    style={styles.googleButton}
                    onPress={handleGoogleSignIn}
                    activeOpacity={0.9}
                >
                    <View style={styles.googleIconContainer}>
                        <Ionicons name='logo-google' size={20} color={COLORS.surface} />
                    </View >
                </TouchableOpacity>

                <Text style={styles.termsText}>
                    By continuing, you agree to our Terms and Privacy Policy
                </Text>
            </View>
        </View>
    )
};