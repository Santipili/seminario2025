import { ApiClient } from "../../../common/ApiClient.js";
import { configApiFileSystem } from "../../../config.js";
import { LocalStorageHandler } from "../../../common/LocalStorageHandler.js";
class CreateUserModel {
    constructor() {
        this.apiClient = new ApiClient(configApiFileSystem.url);
        this.localStorage = new LocalStorageHandler();
        this.currentUserId = null;
    }
    initFromLocalStorage() {
        this.currentUserId = this.localStorage.getOfLocalStorage("userId") || null;
    }

    validateUserData(data) {
        const {
            nickname,
            password,
            repeatPassword,
            name,
            surname,
            email,
            phone,
            group,
        } = data;

        if (!nickname || !password || !repeatPassword || !name || !surname || !email || !group) {
            return {
                valid: false,
                message: "Todos los campos obligatorios deben estar completos.",
            };
        }

        if (password !== repeatPassword) {
            return {
                valid: false,
                message: "Las contraseñas no coinciden.",
            };
        }

        return { valid: true, message: null };
    }

    async createUser(data) {
        const validation = this.validateUserData(data);

        if (!validation.valid) {
            return {
                success: false,
                message: validation.message,
            };
        }

        if (!this.apiClient) {
            console.error("CreateUserModel: apiClient no está definido.");
            return {
                success: false,
                message: "Error interno: apiClient no configurado.",
            };
        }

        // TODO: ajustar BODY
        const body = {
            nickname: data.nickname,
            password: data.password,
            name: data.name,
            surname: data.surname,
            NID: 1111,
            email: data.email,
            phone: data.phone,
            groupName: data.group,
        };

        try {
            const response = await this.apiClient.makeApiCall(
                "user/register",
                "POST",
                body,
                null,
                this.currentUserId
            );

            if (response?.status) {
                return {
                    success: true,
                    message: "Usuario creado correctamente.",
                    rawResponse: response,
                };
            } else {
                return {
                    success: false,
                    message:
                        response?.message ||
                        "No se pudo crear el usuario.",
                    rawResponse: response,
                };
            }
        } catch (err) {
            console.error("Error creando usuario:", err);
            return {
                success: false,
                message: "Ocurrió un error al crear el usuario.",
                error: err,
            };
        }
    }
    async getAvailableGroups() {
        if (!this.currentUserId) {
            console.warn("No hay userId en localStorage, no se pueden cargar usuarios");
            this.users = [];
            return this.users;
        }

        const response = await this.apiClient.makeApiCall(
            "group/getList",
            "GET",
            null,
            null,
            this.currentUserId
        );
        if (response?.status) {
            const groups = response?.data || [];
            return groups;
        }
        return [];
    }
}

export { CreateUserModel };
