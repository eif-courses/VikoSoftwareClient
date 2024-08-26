
export interface Subject {
    title: string;
    credits: number;
    semester: number;
}

export interface SubjectType {
    name: string;
    subjects: Subject[];
}

export interface CategoryDto {
    title: string;
    subjectTypes: SubjectType[];
}

export interface Category {
    id: string;
    title: string;
    subjectTypes: string[];  // Assuming `subjectTypes` is an array of strings
}

export interface CategoriesResponse {
    categories: Category[];
}




