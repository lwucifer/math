const SCHOOLS = [
    {
        id: 1,
        image: 'https://picsum.photos/218/129',
        name: "Trường THCS Nguyễn Thị Thập",
        address: "Hà Đông, Hà Nội",
        teacherNum: 100,
        studentNum: 1000,
    },
    {
        id: 2,
        image: 'https://picsum.photos/218/129',
        name: "Trường THCS Nguyễn Thị Thập",
        address: "Hà Đông, Hà Nội",
        teacherNum: 100,
        studentNum: 1000,
    },
    {
        id: 3,
        image: 'https://picsum.photos/218/129',
        name: "Trường THCS Nguyễn Thị Thập",
        address: "Hà Đông, Hà Nội",
        teacherNum: 100,
        studentNum: 1000,
    },
    {
        id: 4,
        image: 'https://picsum.photos/218/129',
        name: "Trường THCS Nguyễn Thị Thập",
        address: "Hà Đông, Hà Nội",
        teacherNum: 100,
        studentNum: 1000,
    },
    {
        id: 5,
        image: 'https://picsum.photos/218/129',
        name: "Trường THCS Nguyễn Thị Thập",
        address: "Hà Đông, Hà Nội",
        teacherNum: 100,
        studentNum: 1000,
    },
]

export const SCHOOL_TYPES = [
    {
        value: 1,
        text: 'Cấp 1'
    },
    {
        value: 2,
        text: 'Cấp 2'
    },
    {
        value: 3,
        text: 'Cấp 3'
    }
]

export const SCHOOL_TYPE_DETAILS = [
    {
        id: 1,
        name: 'Mầm non',
        schoolNum: 50,
        teacherNum: 100,
        studentNum: 1000,
        list: SCHOOLS
    },
    {
        id: 2,
        name: 'Tiểu học cơ sở',
        schoolNum: 50,
        teacherNum: 100,
        studentNum: 1000,
        list: SCHOOLS
    },
    {
        id: 3,
        name: 'Trung học cơ sở',
        schoolNum: 50,
        teacherNum: 100,
        studentNum: 1000,
        list: SCHOOLS
    },
    {
        id: 4,
        name: 'Trung học phổ thông',
        schoolNum: 50,
        teacherNum: 100,
        studentNum: 1000,
        list: SCHOOLS
    }
]

export const PROVINCES = [
    {
        value: 1,
        text: 'Hà Nội'
    },
    {
        value: 2,
        text: 'Hải Phòng'
    },
    {
        value: 3,
        text: 'Nam Định'
    },
    {
        value: 4,
        text: 'Hải Dương'
    },
]

export const DISTRICTS = [
    {
        value: 1,
        text: 'Cầu Giấy'
    },
    {
        value: 2,
        text: 'Thanh Xuân'
    },
    {
        value: 3,
        text: 'Nam Từ Liêm'
    },
]

export const VILLAGES = [
    {
        value: 1,
        text: 'Dịch Vọng'
    },
    {
        value: 2,
        text: 'Khương Trung'
    },
    {
        value: 3,
        text: 'Xuân Trường'
    },
]

export const SCHOOL_SUMMARY = {
    id: "1",
    name: "Đại học Đại Nam",
    logo: "https://picsum.photos/171/171",
    thumnail: "https://picsum.photos/280/168",
    province: "Hà Nội",
    district: "Hà Đông",
    ward: "Phú Lãm",
    address: "69 ",
    intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rhoncus accumsan quam non tempus. Quisque scelerisque porttitor sem, dictum dapibus tortor blandit vestibulum. Quisque scelerisque porttitor sem, dictum dapibus tortor blandit vestibulum. Quisque scelerisque porttitor sem, dictum dapibus tortor blandit vestibulum. Quisque scelerisque porttitor sem, dictum dapibus tortor blandit vestibulum. Quisque scelerisque porttitor sem, dictum dapibus tortor blandit vestibulum. Quisque scelerisque porttitor sem, dictum dapibus tortor blandit vestibulum. Quisque scelerisque porttitor sem, dictum dapibus tortor blandit vestibulum. Quisque scelerisque porttitor sem, dictum dapibus tortor blandit vestibulum. Quisque scelerisque porttitor sem, dictum dapibus tortor blandit vestibulum.",
    description:
        "<p><span>Địa chỉ:</span><b> 15 Xuân Diệu, Tây Hồ, Hà Nội</b></p>" +
        "<p><span>Số điện thoại: </span></span><b> 0906771634</b></p>" +
        "<p><span>Email:</span><b> Scholly@gmail.com</b></p>" +
        "<p><span>Mã trường:</span><b> MHDUAA12</b></p>",
    level: 1,
    teachers: 500,
    students: 1500,
    lessons: 52,
    courses: 13,
    status: 1,
    jobs: [
        {
            id: 1,
            name: "Tuyển 01 giáo viên tiếng Anh"
        },
        {
            id: 2,
            name: "Tuyển 05 đầu bếp căng tin"
        }
    ]
}