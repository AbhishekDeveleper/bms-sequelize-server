var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
// fro validating model value
export const validateModel = (model) => {
    //using type narrowing to check model and validating its value
    if ("userName" in model) {
        const { userName, userRole, password } = model, other = __rest(model, ["userName", "userRole", "password"]);
        if (Object.keys(other).length != 0)
            return false;
        return model.userName && model.password && model.userRole
            ? true
            : false;
    }
    if ("bookTitle" in model) {
        if (typeof (model.bookIsbn) != 'number')
            return false;
        if (typeof model.bookPrice != 'number')
            return false;
        return model.bookTitle &&
            model.bookIsbn &&
            model.bookPrice && model.publishDate
            ? true
            : false;
    }
    return false;
};
