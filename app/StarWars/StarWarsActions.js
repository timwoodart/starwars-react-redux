// Profile Actions
export const UPDATE_PROFILE = 'UPDATE_PROFILE';

export function updateProfile(payload) {
    return {
        type: UPDATE_PROFILE,
        payload
    }
}