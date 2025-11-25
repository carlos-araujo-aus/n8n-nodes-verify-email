import { INodeType, INodeTypeDescription, NodeConnectionTypes } from 'n8n-workflow';
import dotenv from 'dotenv';

dotenv.config();

const URL_API = process.env.URL_API_VERIFY_EMAIL ?? '';

export class VerifyEmail implements INodeType {
	description: INodeTypeDescription = {
        displayName: 'Verify Email',
        name: 'VerifyEmail',
        icon: 'file:email.png',
        group: ['transform'],
        version: 1,
        subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
        description: 'Verify an email address using a third-party API',
        defaults: {
            name: 'Verify Email',
        },
        inputs: [NodeConnectionTypes.Main],
        outputs: [NodeConnectionTypes.Main],
        credentials: [
            {
                name: 'VerifyEmailApi',
                required: true,
            },
        ],
        requestDefaults: {
            baseURL: URL_API,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        },        
		properties: [
            {
                displayName: 'Email Address',
                name: 'email',
                type: 'string',
                placeholder: 'Enter the email address to verify',
                noDataExpression: true,
                default: '',
                routing: {
                    request: {
                        qs: {
                            email: '={{ $value }}',
                        }
                    }
                }
            },           
        ]
	};
}