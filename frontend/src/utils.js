export const getGenders = () => {
    return ["Unspecified", "Male", "Female"].map((gender, index) => {
        return {
            key: index,
            text: gender,
            value: index,
        };
    });
};
