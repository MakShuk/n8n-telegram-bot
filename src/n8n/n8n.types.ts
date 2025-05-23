export interface IN8NNode {
    id: string;
    name: string;
    type?: string;
    webhookId?: string;
}

export interface IN8NWorkflowData {
    id: string;
    name: string;
    nodes?: IN8NNode[];
}

export interface IN8NResponse {
    data: IN8NWorkflowData[];
}

export interface Workflow {
    id: string;
    name: string;
    nodes?: IN8NNode[];
}
