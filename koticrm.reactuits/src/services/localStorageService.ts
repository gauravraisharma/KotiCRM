class LocalStorageService {
    private static instance: LocalStorageService;

    private constructor() { }

    public static getService(): LocalStorageService {
        if (!LocalStorageService.instance) {
            LocalStorageService.instance = new LocalStorageService();
        }
        return LocalStorageService.instance;
    }

    public setItem(key: string, value: unknown): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    public getItem<T>(key: string): T | null {
        const item = localStorage.getItem(key);
        return item ? (JSON.parse(item) as T) : null;
    }

    public removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    public getAccessToken(): string | null {
        return this.getItem<string>('accessToken');
    }
}

export default LocalStorageService;