
export const checkIdExist = async (jsonData: any, id: number):Promise<boolean> => {
    return jsonData.some((d: { id: number }) => d.id === id)
        
}