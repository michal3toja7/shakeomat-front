const findInList = (list: any[], key_name: string, key_value: string) => {
    return list.findIndex((obj => obj[key_name] === key_value));

}
export default findInList
