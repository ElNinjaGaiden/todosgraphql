begin;

create table    public.User (
  Id            serial primary key,
  FirstName     text not null check (char_length(FirstName) < 80),
  LastName      text not null check (char_length(LastName) < 80),
  AddedOn       timestamp default now()
);

create table     public.Priority  (
  Id            integer primary key,
  Name          text not null check (char_length(Name) < 50)
);

create table     public.TodoStatus (
  Id            integer primary key,
  Name          text not null check (char_length(Name) < 50)
);

create table    public.Todo (
  Id                serial primary key,
  OwnerId           integer null references public.User(Id),
  Title             text not null check (char_length(Title) < 280),
  Description       text not null check (char_length(Title) < 1000),
  PriorityId        integer null references public.Priority(Id),
  StatusId          integer null references public.TodoStatus(Id),
  CreatedOn         timestamp default now(),
  CreatorId         integer null references public.User(Id),
  DueDate           date not null
);

create function public.RegisterUser (
  FirstName text,
  LastName text
) returns public.User as $$
declare
  user public.User;
begin
  insert into public.User (FirstName, LastName) values
    (FirstName, LastName)
    returning * into user;

  return user;
end;
$$ language plpgsql strict security definer;

create function public.CreateTodo (
  Title text,
  Description text,
  PriorityId integer,
  StatusId integer,
  CreatorId integer,
  CreatedOn text
  DueDate text,
  OwnerId integer
) returns public.Todo as $$
declare
  otod public.Todo;
begin
  insert into public.Todo (Title, Description, PriorityId, StatusId, CreatorId, CreatedOn, DueDate, OwnerId) values
    (Title, Description, PriorityId, StatusId, CreatorId, to_timestap(CreatedOn), to_date(DueDate, 'DD/MM/YYYY'), OwnerId)
    returning * into todo;

  return todo;
end;
$$ language plpgsql strict security definer;

create function public.CreateTodo (
  Title text,
  Description text,
  PriorityId integer,
  StatusId integer,
  CreatorId double precision,
  DueDate text,
  OwnerId integer
) returns public.Todo as $$
declare
  todo public.Todo;
begin
  insert into public.Todo (Title, Description, PriorityId, StatusId, CreatorId, CreatedOn, DueDate, OwnerId) values
    (Title, Description, PriorityId, StatusId, CreatorId, now(), to_date(DueDate, 'YYYY-MM-DD'), OwnerId)
    returning * into todo;

  return todo;
end;
$$ language plpgsql security definer;

commit;