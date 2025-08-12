export const isStrongPassword = (pwd: string): boolean => {
	return /^(?=.*\d)[A-Za-z\d]{6,}$/.test(pwd);
};
