import { toast } from "react-toastify";

export const getStoreLocal = (name: string) => {
  if (typeof localStorage !== "undefined") {
    const ls = localStorage.getItem(name);
    if (ls) {
      try {
        const parsedData = JSON.parse(ls);
        
        // Проверяем, является ли parsedData undefined
        if (parsedData === undefined) {
          localStorage.removeItem(name); // Удаляем из локального хранилища
          window.location.reload(); // Перезагружаем страницу
          toast.error("Произошла ошибка, войдите в аккаунт снова");

        }
        
        return parsedData;
      } catch (error) {
        return null; // Или можно вернуть ls
      }
    }
  }
  return null;
};
