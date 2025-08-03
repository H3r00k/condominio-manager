import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    set<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    get<T>(key: string): T | null {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;

    }

    remove(key: string): void {
        localStorage.removeItem(key);
    }

    clear(): void {
        localStorage.clear();
    }
}