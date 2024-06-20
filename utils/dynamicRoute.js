import axios from 'axios';
import netlifyEnv from '../netlify-env';

export async function getPostRoutes() {
    let domain = process.env.DEFAULT_PAGE_DOMAIN;
    domain = domain.split('.')[0];
    let slugs = await axios.get(
        `${netlifyEnv.BACKEND_URL}/website/dynamic-routes/?domain=${domain}`
    );
    return slugs.data;
}
