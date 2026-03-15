import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser, LoginCredentials, RegisterData } from "@/lib/api/auth";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser, logout } from "@/store/slices/authSlice";
import { showNotification } from "@/store/slices/uiSlice";

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((s) => s.auth);

  const loginMutation = useMutation({
    mutationFn: (creds: LoginCredentials) => loginUser(creds),
    onSuccess: (user) => {
      dispatch(setUser(user));
      dispatch(showNotification({ message: `Welcome back, ${user.name}!`, type: "success" }));
    },
    onError: (err: Error) => {
      dispatch(showNotification({ message: err.message, type: "error" }));
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterData) => registerUser(data),
    onSuccess: (user) => {
      dispatch(setUser(user));
      dispatch(showNotification({ message: "Account created successfully!", type: "success" }));
    },
    onError: (err: Error) => {
      dispatch(showNotification({ message: err.message, type: "error" }));
    },
  });

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    user,
    isAuthenticated,
    isSuperAdmin: user?.role === "superadmin",
    isAdmin: user?.role === "admin" || user?.role === "superadmin",
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: handleLogout,
    loginLoading: loginMutation.isPending,
    registerLoading: registerMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
}
