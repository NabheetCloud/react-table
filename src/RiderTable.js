// src/RiderTable.js
import React, { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  flexRender,
} from '@tanstack/react-table';
import './RiderTable.css';

const RiderTable = () => {
  const data = useMemo(
    () => [
      {
        serial: 1,
        riderName: 'Rahul Kumar',
        riderId: 'RD67',
        contactNumber: '123-456-7890',
        payment: 'Rs 5006000',
        status: 'Pending',
        details: [
          { serial: 1, date: '24 Jan 2024', orderId: '#7897879' },
          { serial: 2, date: '26 Jan 2024', orderId: '#7897879' },
          { serial: 3, date: '05 Feb 2024', orderId: '#7897879' },
          { serial: 4, date: '17 Feb 2024', orderId: '#7897879' },
          { serial: 5, date: '24 Jan 2024', orderId: '#7897879' },
          { serial: 6, date: '24 Jan 2024', orderId: '#7897879' },
        ],
      },
      {
        serial: 1,
        riderName: 'Rahul Kumar',
        riderId: 'RD67',
        contactNumber: '123-456-7890',
        payment: 'Rs 5006000',
        status: 'Pending',
        details: [
          { serial: 1, date: '24 Jan 2024', orderId: '#7897879' },
          { serial: 2, date: '26 Jan 2024', orderId: '#7897879' },
          { serial: 3, date: '05 Feb 2024', orderId: '#7897879' },
          { serial: 4, date: '17 Feb 2024', orderId: '#7897879' },
          { serial: 5, date: '24 Jan 2024', orderId: '#7897879' },
          { serial: 6, date: '24 Jan 2024', orderId: '#7897879' },
        ],
      },
      {
        serial: 1,
        riderName: 'Rahul Kumar',
        riderId: 'RD67',
        contactNumber: '123-456-7890',
        payment: 'Rs 5006000',
        status: 'Pending',
        details: [
          { serial: 1, date: '24 Jan 2024', orderId: '#7897879' },
          { serial: 2, date: '26 Jan 2024', orderId: '#7897879' },
          { serial: 3, date: '05 Feb 2024', orderId: '#7897879' },
          { serial: 4, date: '17 Feb 2024', orderId: '#7897879' },
          { serial: 5, date: '24 Jan 2024', orderId: '#7897879' },
          { serial: 6, date: '24 Jan 2024', orderId: '#7897879' },
        ],
      },
      // Add more dummy data as needed
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: 'serial',
        header: 'SL. No.',
      },
      {
        accessorKey: 'riderName',
        header: 'Rider Name',
      },
      {
        accessorKey: 'riderId',
        header: 'Rider Id',
      },
      {
        accessorKey: 'contactNumber',
        header: 'Contact Number',
      },
      {
        accessorKey: 'payment',
        header: 'Payment',
      },
      {
        accessorKey: 'status',
        header: 'Status',
      },
      {
        id: 'expander',
        header: () => null,
        cell: ({ row }) => (
          row.getCanExpand() ? (
            <span
              {...{
                onClick: (e) => {
                  debugger; // Add debugger statement
                  row.getToggleExpandedHandler()(e);
                },
                style: { cursor: 'pointer' },
              }}
            >
              {row.getIsExpanded() ? '👇' : '👉'}
            </span>
          ) : null
        ),
      },
    ],
    []
  );

  const subColumns = useMemo(
    () => [
      {
        accessorKey: 'serial',
        header: 'SL. No.',
      },
      {
        accessorKey: 'date',
        header: 'Date',
      },
      {
        accessorKey: 'orderId',
        header: 'OrderID',
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: row => !!row.original.details, // Ensure rows with details can expand
  });

  return (
    <div style={{ padding: '20px' }}>
      <h1>AP Logistics Riders</h1>
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <React.Fragment key={row.id}>
              <tr>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
              {row.getIsExpanded() && (
                <tr>
                  <td colSpan={columns.length}>
                    <table className="sub-table">
                      <thead>
                        <tr>
                          {subColumns.map(col => (
                            <th key={col.accessorKey}>{col.header}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {row.original.details.map((detail, i) => (
                          <tr key={i}>
                            {subColumns.map(col => (
                              <td key={col.accessorKey}>
                                {detail[col.accessorKey]}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RiderTable;
