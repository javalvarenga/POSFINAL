export const useQueryConfig = {
    refetchOnWindowFocus: false, // No refetch when window is focused
    refetchOnMount: false, // No refetch on component mount
    refetchOnReconnect: true, // No refetch on reconnect
    staleTime: Infinity // Data is permanent until I wish
  };