import { Dependencies } from '$lib/constants';
import { sdkForConsole, sdkForProject } from '$lib/stores/sdk';
import { Query } from '@aw-labs/appwrite-console';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent, depends }) => {
    await parent();
    depends(Dependencies.RULES);

    return {
        rules: await sdkForProject.proxy.listRules([Query.equal('resourceType', 'api')])
    };
};