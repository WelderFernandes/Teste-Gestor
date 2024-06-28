import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { uniqueId } from "lodash";


import {
  IconBuilding,
  IconBuildingEstate,
  IconBuildingStore,
  IconChartDonut3,
  IconCircle,
  IconCirclePlus,
  IconHeartHandshake,
  IconLanguage,
  IconLayoutList,
  IconLock,
  IconPhoto,
  IconPoint,
  IconUsers
} from '@tabler/icons-react';

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}

const Menuitems: MenuitemsType[] = [
  {
      navlabel: true,
      subheader: 'Imóveis',
  
  },{
      id: uniqueId(),
      title: 'Imóveis Novos',
      icon: IconBuilding,
      href: '#',
  
  },{
      id: uniqueId(),
      title: 'Vendas',
      icon: IconBuildingStore,
      href: '#',
  
  },{
      id: uniqueId(),
      title: 'Aluguel',
      icon: IconBuildingEstate,
      href: '#',
  
  },{
      id: uniqueId(),
      title: 'Tipos de imóveis',
      icon: IconLayoutList,
      href: '#',
      
  },{
      navlabel: true,
      subheader: 'Registros',
  
  },{
      id: uniqueId(),
      title: 'Banners Publicidade',
      icon: IconPhoto,
      href: '#',
  
  },{
      id: uniqueId(),
      title: 'Parceiros',
      icon: IconHeartHandshake,
      href: '#',

  },{
      id: uniqueId(),
      title: 'Agências',
      icon: IconCircle,
      href: '/agencies',

  },{
      id: uniqueId(),
      title: 'Usuárias',
      icon: PeopleAltIcon,
      href: '/users',
  
  },{
      navlabel: true,
      subheader: '#',

  },{
      id: uniqueId(),
      title: 'Posts',
      icon: IconCircle,
      href: '#',

  },{
      id: uniqueId(),
      title: 'Novo post',
      icon: IconCirclePlus,
      href: '#',

  },{
      id: uniqueId(),
      title: 'Categorias',
      icon: IconLayoutList,
      href: '#',

  
  },{
      navlabel: true,
      subheader: 'Buscas',
  
  },{
      id: uniqueId(),
      title: 'Rastreamentos',
      icon: IconCircle,
      href: '#',
  
  },{
      id: uniqueId(),
      title: 'Buscas Populares',
      icon: IconCircle,
      href: '#',
  
  },{
      id: uniqueId(),
      title: 'Buscas Recomendadas',
      icon: IconCircle,
      href: '#',
  

      
  },{
      navlabel: true,
      subheader: 'Contatos',
  
  },{
      id: uniqueId(),
      title: 'Contatos',
      icon: IconChartDonut3,
      href: '#',
      children: [
          {
              id: uniqueId(),
              title: 'Registros',
              icon: IconPoint,
              href: '#',
          },{
              id: uniqueId(),
              title: 'Assuntos',
              icon: IconPoint,
              href: '#',
          },
      ],
  
  },{
      id: uniqueId(),
      title: 'Banco de talentos',
      icon: IconCircle,
      href: '#',

      
  },{
      navlabel: true,
      subheader: 'Usuários',

  },{
      id: uniqueId(),
      title: 'Equipe',
      icon: IconUsers,
      href: '#',

  },{
      id: uniqueId(),
      title: 'Niveis de acesso',
      icon: IconLock,
      href: '#',
     
      
  },{
      navlabel: true,
      subheader: 'Configurações',

  },{
      id: uniqueId(),
      title: 'Idiomas',
      icon: IconLanguage,
      href: '#',

  },{
      id: uniqueId(),
      title: 'Politica de privacidade',
      icon: IconCircle,
      href: '#',

  },{
      navlabel: true,
      subheader: 'Institucional',
  
  },{
      id: uniqueId(),
      title: 'Conheça a RE/MAX',
      icon: IconCircle,
      href: '#',
  
  },{
      id: uniqueId(),
      title: 'Porque a RE/MAX',
      icon: IconCircle,
      href: '#',
  
  },{
      id: uniqueId(),
      title: 'RE/MAX no Brasil',
      icon: IconCircle,
      href: '#',

  },{
      id: uniqueId(),
      title: 'RE/MAX no Mundo',
      icon: IconCircle,
      href: '#',

  },{
      id: uniqueId(),
      title: 'Universidade',
      icon: IconCircle,
      href: '#',

  },{
      id: uniqueId(),
      title: 'Relação com investidores',
      icon: IconCircle,
      href: '#',
  },
];

export default Menuitems;
