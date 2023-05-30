import service from "@/api/axios.config";

export const searchDomains = (name,d)=> service(
    {
        url:"/domain/search?name="+name+"&d="+d,
        method:"get"
    }
);

export const fetchSupported = ()=> service(
    {
        url:"/domain/supported",
        method:"get"
    }
);

export const login = (params)=> service(
    {
        url:"/auth/login",
        method:"post",
        data:params
    }
);

export const updatePassword = (params)=> service(
    {
        url:"/auth/updatePassword",
        method:"post",
        data:params
    }
);

export const registerAccount = (params)=> service(
    {
        url:"/auth/register",
        method:"post",
        data:params
    }
);

export const logout = (params)=> service(
    {
        url:"/auth/logout",
        method:"post",
        data:params
    }
);
export const registerDomain = (params)=> service(
    {
        url:"/domain/new",
        method:"post",
        data:params
    }
);

export const listMyDomains = (params)=> service(
    {
        url:"/domain/list",
        method:"post",
        data:params
    }
);

export const updateDomain = (params)=> service(
    {
        url:"/domain/modify",
        method:"post",
        data:params
    }
);

export const dropDomain = (params)=> service(
    {
        url:"/domain/drop",
        method:"post",
        data:params
    }
);