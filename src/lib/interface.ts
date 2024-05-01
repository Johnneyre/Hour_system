export interface Department {
  department_name: string
  id: number
}

export interface TaskGroup {
  name: string
  id: number
}

export interface Project {
  name: string
  id: number
  description: string
  cost_center: string
  manager_id: number
  is_disabled: number
  is_deparment: number
}

export interface Task {
  name: string
  task_group_id: number
  id: number
}

export interface IUserInfo {
  email: string
  birthdate: string
  dni: string
  document_type: string
  first_names: string
  last_names: string
  phone: string
  cellphone: string
  company: string
  entry_date: string
  country: string
  city: string
  status: string
  ticket_number: string
  position: string
  contract_position: string
  id: number
  dni_id: string
  department: Department
  task_groups: TaskGroup[]
  tasks: Task[]
  projects: Project[]
  allowed_hours: number
}

export interface ReportTask {
  name: string
  note?: string
  task_group_id: number
  id: number
  hours: number | null
}

export interface Report {
  id: number
  date: string
  notes?: string
  hours: number
  personal_id: number
  report_tasks: ReportTask[]
  project: Project | null
}

export interface ReportUpdate {
  id: number
  date: Date
  notes?: string
  hours: number
  personal_id: number
  project_id: number
  report_tasks: ReportTask[]
  tasks: number[]
  project: Project
  dayBloked: boolean
}

export interface CreateReport {
  date: Date
  hours: number
  notes?: string
  personal_id: number
  project_id: number
  tasks: number[]
  info?: string
}

export interface FechaInterface {
  dateString: string
  dateID: string
  date: string
  id?: string
  diaSemana: string
  dia: string
  mes: string
  year: string
  personaid: string
  nombres: string
  apellidos: string
  fullname: string
  tipoDoc: string
  email: string
  phone: string
  birthdate: string
  empresa: string
  area: string
  gerenteArea: string
  cargo: string
  contrato: string
  fechaIngreso: string
  pais: string
  ciudad: string
  gerente_de: string
  mainArea: string
  otro1: string
  tareas: string
  tareasList: TareaInterface[]
  horas_planificadas: string
  proyecto: string
  numeroProyecto: string
  detalleProyecto: string
  gerenteProyecto: string
  gerenteProyectoid: string
  estado: string
  activo: string
  horas: number
  detalleid: string
  [key: string]: any
}

// export interface FechaInterfaceArray extends Array<FechaInterface> {}

export interface TareaInterface {
  tareaid: string
  cargo: string
  tipo: string
  tarea: string
}

export interface ISnackbar {
  type: string
  p: string
  open: boolean
  time?: any
}

export interface percentageOnDate {
  nombre: string
  correo: string
  cedula: string
  numero: string
  proyecto: string
  horas: number
  porcentaje: number
}

export interface ITareas {
  id: string
  tareaid: string
  tarea: string
  dateID: string
  numeroProyecto: string
  personaID: string
}

export interface ProjectDedication {
  personal_id: number
  project_id: number
  project_hours: number
  project_name: string
  project_cost_center: string
  percentage_dedication: number
}

export interface Birthday {
  position: string
  birthdate: string
  first_names: string
  last_names: string
  month: number
  fullName?: string
  department_name: string | number
}

export interface Directory {
  personal_id: number
  pp_project_id: number
  department_id: number
  pp_position: string
  first_names: string
  last_names: string
  email: string
}

export interface RequestType {
  id: number
  type: string
  cost_center: string
  assigned_to: string
  approval_date: string
  hours: number
  reason: string
  tasks: string
  attachments: string
  state: string
  created_by: string
  created_at: Date
  reason_state: string
  created_by_name: string
  task_description: string
}
