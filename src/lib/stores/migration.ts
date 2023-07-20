import { writable } from 'svelte/store';

import { includesAll } from '$lib/helpers/array';

const initialFormData = {
    users: {
        root: false,
        teams: false
    },
    databases: {
        root: false,
        documents: false
    },
    functions: {
        root: false,
        env: false,
        inactive: false
    },
    storage: {
        root: false
    }
};
export type MigrationFormData = typeof initialFormData;

export const createMigrationFormStore = () => {
    const store = writable({ ...initialFormData });
    const reset = () => {
        store.set({ ...initialFormData });
    };

    return {
        ...store,
        reset
    };
};

const resources = [
    'user',
    'team',
    'membership',
    'file',
    'bucket',
    'function',
    'envVar',
    'deployment',
    'database',
    'collection',
    'index',
    'attribute',
    'document'
] as const;

type Resource = (typeof resources)[number];

export const providerResources: Record<Provider, Resource[]> = {
    appwrite: [...resources],
    supabase: [
        'user',
        'database',
        'collection',
        'attribute',
        'index',
        'document',
        'bucket',
        'file'
    ],
    nhost: ['user', 'database', 'collection', 'attribute', 'index', 'document', 'bucket', 'file'],
    firebase: []
};

export const migrationFormToResources = (formData: MigrationFormData): Resource[] => {
    const resources: Resource[] = [];
    if (formData.users.root) {
        resources.push('user');
    }
    if (formData.users.teams) {
        resources.push('team');
        resources.push('membership');
    }
    if (formData.databases.root) {
        resources.push('database');
    }
    if (formData.databases.documents) {
        resources.push('collection');
        resources.push('attribute');
        resources.push('index');
        resources.push('document');
    }
    if (formData.functions.root) {
        resources.push('function');
    }
    if (formData.functions.env) {
        resources.push('envVar');
    }
    if (formData.functions.inactive) {
        resources.push('deployment');
    }
    if (formData.storage.root) {
        resources.push('bucket');
        resources.push('file');
    }

    return resources;
};

export const resourcesToMigrationForm = (resources: Resource[]): MigrationFormData => {
    const formData = { ...initialFormData };
    if (resources.includes('user')) {
        formData.users.root = true;
    }
    if (includesAll(resources, ['team', 'membership'])) {
        formData.users.teams = true;
    }
    if (resources.includes('database')) {
        formData.databases.root = true;
    }
    if (includesAll(resources, ['collection', 'attribute', 'index', 'document'])) {
        formData.databases.documents = true;
    }
    if (resources.includes('function')) {
        formData.functions.root = true;
    }
    if (resources.includes('envVar')) {
        formData.functions.env = true;
    }
    if (resources.includes('deployment')) {
        formData.functions.inactive = true;
    }
    if (includesAll(resources, ['bucket', 'file'])) {
        formData.storage.root = true;
    }

    return formData;
};

type AppwriteInput = {
    provider: 'appwrite';
    endpoint?: string;
    projectID?: string;
    apiKey?: string;
};

type FirebaseInput = {
    provider: 'firebase';
    serviceAccount?: string;
};

type SupabaseInput = {
    provider: 'supabase';
    host?: string;
    username?: string;
    password?: string;
    endpoint?: string;
    apiKey?: string;
    port?: number;
};

type NhostInput = {
    provider: 'nhost';
    region?: string;
    subdomain?: string;
    database?: string;
    username?: string;
    password?: string;
    adminSecret?: string;
};

export type ProviderInput = AppwriteInput | NhostInput | SupabaseInput | FirebaseInput;
export type Provider = ProviderInput['provider'];


const initialProvider: ProviderInput = { provider: 'appwrite' };
export const createMigrationProviderStore = () => {
    const store = writable<ProviderInput>({ ...initialProvider });

    const changeProvider = (provider: Provider) => {
        const newProvider: ProviderInput = { provider };
        store.set(newProvider);
    };

    return {
        ...store,
        changeProvider
    };
};