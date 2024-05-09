import * as yup from "yup";
export const schema = yup.object({
  name: yup
    .string()
    .required("Name là bắt buộc")
    .matches(
      /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/,
      "Tên người dùng ít nhất 1 ký tự và không có ký tự đặc biệt!"
    ),
  email: yup
    .string()
    .required("Email là bắt buộc")
    .email("Email không đúng định dạng"),
  password: yup
    .string()
    .required("Password là bắt buộc")
    .min(6, "Độ dài từ 6 đến 160 kí tự")
    .max(160, "Độ dài từ 6 đến 160 kí tự"),
  confirm_password: yup
    .string()
    .required("Confirm password là bắt buộc")
    .min(6, "Độ dài từ 6 đến 160 kí tự")
    .max(160, "Độ dài từ 6 đến 160 kí tự")
    .oneOf([yup.ref("password")], "Confirm password không đúng"),
});
export const Loginschema = yup.object({
  email: yup
    .string()
    .required("Email là bắt buộc")
    .email("Email không đúng định dạng"),
  password: yup
    .string()
    .required("Password là bắt buộc")
    .min(6, "Độ dài từ 6 đến 160 kí tự")
    .max(160, "Độ dài từ 6 đến 160 kí tự"),
});
