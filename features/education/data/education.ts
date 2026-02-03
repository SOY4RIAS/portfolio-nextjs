// Education Feature - Data
// Clean Architecture: Single source of truth for education information

export interface Education {
  school: string;
  degree: string;
  period: string;
}

export const education: Education[] = [
  {
    school: 'Servicio Nacional de Aprendizaje (SENA)',
    degree: 'Analyst and Developer of Software - Computer Software Technology/Technician',
    period: '2016 - 2018',
  },
];
