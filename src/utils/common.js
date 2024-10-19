import slugify from 'slugify';
import removeAccents from 'remove-accents';

export const getSlug = (title) => {
    const options = {
        replacement: '-', // Dấu phân cách giữa các từ
        remove: /[*+~.()'"!:@?,]/g, // Xóa dấu câu và ký tự đặc biệt
        lower: true, // Chuyển đổi thành chữ thường
        strict: false, // Chấp nhận các ký tự không phải ASCII
    };

    const noAccentsTitle = removeAccents(title);
    const formatNoAccentsTitle = noAccentsTitle.replace('/', '-');
    const slug = slugify(formatNoAccentsTitle, options);
    return slug;
};

export const formatPrice = (price) => {
    if (price >= 1e9) {
        return (price / 1e9).toFixed(1) + ' tỷ';
    } else if (price >= 1e8) {
        return (price / 1e8).toFixed(1) + ' trăm triệu';
    } else if (price >= 1e7) {
        return (price / 1e7).toFixed(1) + ' chục triệu';
    } else if (price >= 1e6) {
        return (price / 1e6).toFixed(1) + ' triệu';
    } else {
        return price.toString(); // Trả về số nguyên nếu nhỏ hơn triệu
    }
};

export const formatPrice2 = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ';
};

export const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const startOfToday = new Date();

    // So sánh với ngày hôm nay

    const diffInMilliseconds = startOfToday.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
        return 'Đăng hôm nay';
    } else if (diffInDays < 7) {
        return `Đăng ${diffInDays} ngày trước`;
    } else if (diffInDays < 30) {
        const weeks = Math.floor(diffInDays / 7);
        return `Đăng ${weeks} tuần trước`;
    } else if (diffInDays < 365) {
        const months = Math.floor(diffInDays / 30);
        return `Đăng ${months} tháng trước`;
    } else {
        const years = Math.floor(diffInDays / 365);
        return `Đăng ${years} năm trước`;
    }
};

export function getDate(dateTimeStr) {
    // Parse the input ISO string into a Date object
    const date = new Date(dateTimeStr);

    // Get the day, month, and year from the date
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();

    // Construct the new format
    return `${day}/${month}/${year}`;
}

export const formatDirection = (direction) => {
    if (direction === 'Bac') return 'Bac';
    if (direction === 'Dong') return 'Đông';
    if (direction === 'Nam') return 'Nam';
    if (direction === 'Tay') return 'Tây';
    if (direction === 'DongBac') return 'Đông-Bắc';
    if (direction === 'TayBac') return 'Tây-Bắc';
    if (direction === 'TayNam') return 'Tây-Nam';
    if (direction === 'DongNam') return 'Đông-Nam';

    return direction;
};

export const formatPhoneNumber = (phoneNumber) => {
    // Xóa bỏ các ký tự không phải số
    const cleaned = phoneNumber.replace(/\D/g, '');

    // Định dạng lại theo dạng XXXX XXX XXX
    const formatted = cleaned.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');

    return formatted;
};

export const markPhoneNumber = (phoneNumber) => {
    // Che 3 số cuối bằng dấu '*'
    const masked = phoneNumber.slice(0, -3) + '***';

    return masked;
};

//xóa bỏ toàn bộ dấu câu và chuyển thành chữ thường
export const removeDiacritics = (str) => {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
};
