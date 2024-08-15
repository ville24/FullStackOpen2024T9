interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }
  
  interface CoursePartBasic extends CoursePartBase {
    kind: "basic"
  }
  
  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
  }
  
  interface CoursePartBackground extends CoursePartBase {
    backgroundMaterial: string;
    kind: "background"
  }

  interface CoursePartSpecial extends CoursePartBase {
    requirements: string[];
    kind: "special"
  }
  
  interface CoursePartDescription extends CoursePartBase {
    description: string;
  }
  
  export type CoursePart = ( CoursePartBasic & CoursePartDescription ) | CoursePartGroup | ( CoursePartBackground & CoursePartDescription ) | ( CoursePartSpecial & CoursePartDescription);