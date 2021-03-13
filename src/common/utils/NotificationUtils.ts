import { Toast } from 'native-base'

type ToastConfigTP = {
    buttonText?: string,
    duration?: number,
    onClose?: (reason: 'user' | 'timeout' | 'functionCall') => void,
}

/**
 * Utilitario para exibicao de notificacoes ao usuario.
 */
export class NotificationUtils {

    static showError(text: string, config?: ToastConfigTP): void {
        NotificationUtils.showNotification('danger', text, config)
    }

    static showSuccess(text: string, config?: ToastConfigTP): void {
        NotificationUtils.showNotification('success', text, config)
    }

    private static showNotification(type: 'danger' | 'success' | 'warning', text: string, config?: ToastConfigTP): void {
        Toast.show({
            text,
            type,
            buttonText: 'OK',
            duration: 2500,
            ...config
        })
    }
}
