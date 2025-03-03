//making this factory function to catch eror and passing it to global error handler
export const catchAsyncFunc = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};
