<template>
  <div class="table_wrap">
    <table class="content_table">
      <thead>
        <tr>
          <th>#</th>
          <th>f.i.sh.</th>
          <th>Tel.Raqami</th>
          <th>Homiylik summasi</th>
          <th>Sarflangan summa</th>
          <th>Sana</th>
          <th>Holati</th>
          <th>Amallar</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Alimov Abror Xabibullayevich</td>
          <td>+99899 973-72-60</td>
          <td>30 000 000 UZS</td>
          <td>0 UZS</td>
          <td>15.01.2021</td>
          <td><span class="change_table">Yangi</span></td>
          <td><img :src="eye" alt="filter" /></td>
        </tr>
        <tr>
          <td>2</td>
          <td>Alimov Abror Xabibullayevich</td>
          <td>+99899 973-72-60</td>
          <td>30 000 000 UZS</td>
          <td>0 UZS</td>
          <td>15.01.2021</td>
          <td><span class="change_table">Yangi</span></td>
          <td><img :src="eye" alt="filter" /></td>
        </tr>
        <tr>
          <td>3</td>
          <td>Alimov Abror Xabibullayevich</td>
          <td>+99899 973-72-60</td>
          <td>30 000 000 UZS</td>
          <td>0 UZS</td>
          <td>15.01.2021</td>
          <td><span class="change_table">Yangi</span></td>
          <td><img :src="eye" alt="filter" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup></script>
<style scoped>
.content_table {
  width: 100%;
}

.content_table thead tr {
  color: rgb(177, 177, 184);
  font-size: 12px;
  font-weight: 500;
  line-height: 14px;
  letter-spacing: 1.13px;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 12px;
}
.content_table tbody {
  border: 1px solid rgba(46, 91, 255, 0.08);
  border-radius: 8px;
  background: rgb(255, 255, 255);
}
.content_table tbody td {
  color: rgb(29, 29, 31);
  font-family: Rubik;
  font-size: 15px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0px;
  text-align: center;
  padding: 20px 0;
  border-style: none;
}

.change_table {
  color: #5babf2;
}
</style>
